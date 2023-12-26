import { EventStatus } from '@prisma/client'

import {
  CreateEventRequest,
  ICurrentUserPoint,
  IOngoingEvent,
  UpdateEventReq
} from '../@types/event'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'
import onlineHistoryService from './online-history.service'
import { scheduleJob } from 'node-schedule'
import redisClient from '../databases/init.redis'
import io from '~/servers/init.socket'
import { IEventData } from '../socket/@types/event'
import kanjiService from './kanji.service'
import roundService from './round.service'

const getAllEvents = async (page: number, offset: number) => {
  const total = await prisma.event.count()

  const events = await prisma.event.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      startTime: true,
      maxPlayers: true,
      status: true,
      title: true,
      description: true,
      tags: true,
      _count: {
        select: {
          joinedUsers: true,
          rounds: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!events) throw new HttpError(404, 'No events found')

  // normalize data
  const returnEvents = events.map(event => ({
    ...event,
    totalJoinedUsers: event._count?.joinedUsers,
    totalRounds: event._count?.rounds
  }))

  return {
    events: returnEvents,
    total
  }
}

const getAllEventsByStatus = async (
  status: EventStatus,
  page: number,
  offset: number,
  search?: string
) => {
  let eventOrder: 'desc' | 'asc' = 'desc'
  if (status === EventStatus.UPCOMING) eventOrder = 'asc'

  const total = await prisma.event.count({
    where: {
      status
    }
  })

  const events = await prisma.event.findMany({
    skip: (page - 1) * offset,
    take: offset,
    where: {
      status,
      title: {
        search
      }
    },
    select: {
      id: true,
      startTime: true,
      maxPlayers: true,
      status: true,
      title: true,
      description: true,
      tags: true,
      rounds: {
        select: {
          id: true,
          order: true,
          status: true,
          stack: {
            select: {
              id: true,
              name: true,
              thumbnail: true
            }
          },
          game: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { startTime: eventOrder }
  })

  if (!events) throw new HttpError(404, 'No events found')

  if (status === EventStatus.UPCOMING) return { events, total }

  const eventsWithLeaderboards = await Promise.all(
    events.map(async event => {
      const leaderboards = await onlineHistoryService.getLeaderboards(event.id, 3)
      return {
        ...event,
        leaderboards
      }
    })
  )

  return { events: eventsWithLeaderboards, total }
}

const createEvent = async (event: CreateEventRequest) => {
  const newEvent = await prisma.event.create({
    data: {
      title: event.title,
      description: event.description,
      maxPlayers: Number(event.maxPlayers),
      tags: event.tags,
      startTime: new Date(event.startTime),
      rounds: {
        create: event.rounds.map(round => ({
          gameId: round.gameId,
          stackId: round.stackId,
          startTime: new Date(
            new Date(event.startTime).getTime() + (Number(round.order) + 1) * 1 * 60 * 1000
          ),
          order: Number(round.order)
        }))
      }
    },
    select: {
      id: true,
      startTime: true,
      maxPlayers: true,
      status: true,
      title: true,
      description: true,
      tags: true,
      rounds: {
        select: {
          id: true,
          order: true,
          status: true,
          startTime: true,
          stack: {
            select: {
              id: true,
              name: true,
              thumbnail: true
            }
          },
          game: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })

  if (!newEvent) throw new HttpError(500, 'Create event failed')

  await redisClient.set(
    `event:${newEvent.id}`,
    JSON.stringify({
      data: newEvent,
      users: []
    })
  )

  scheduleJob(new Date(event.startTime), async () => {
    const updatedEvent = await updateEventStatus(newEvent.id, EventStatus.ONGOING)

    const event = await redisClient.get(`event:${newEvent.id}`)

    if (!event) {
      return io.emit('event:not-found')
    }

    await redisClient.set(
      `event:${newEvent.id}`,
      JSON.stringify({
        data: updatedEvent,
        users: []
      }),
      'KEEPTTL'
    )

    io.to(updatedEvent.id).emit('event:started', {
      event: updatedEvent
    })
  })

  for (const round of newEvent.rounds) {
    scheduleJob(round.startTime, async () => {
      const event = await redisClient.get(`event:${newEvent.id}`)
      if (!event) return io.emit('event:not-found')

      const parsedEvent = JSON.parse(event) as IEventData
      console.log('==> round start', round.id)

      const previousRound = parsedEvent.data.rounds.find(r => r.order === round.order - 1)
      let joinedUsers = parsedEvent.users
      if (previousRound) {
        // remove low score users
        joinedUsers = parsedEvent.users
          .filter(u => u.points[previousRound.order] || 0 > 0)
          .splice(0, 10)
      }

      // Get game content
      const gameContent = await kanjiService.getGameContent(round.game.id, round.stack.id, 12)
      await redisClient.set(
        `event:${newEvent.id}`,
        JSON.stringify({
          ...parsedEvent,
          data: {
            ...parsedEvent.data,
            rounds: parsedEvent.data.rounds.map(r => {
              if (r.id === round.id) {
                return { ...r, status: EventStatus.ONGOING, gameContent }
              }

              if (r.order === round.order - 1) {
                return { ...r, status: EventStatus.FINISHED }
              }

              return r
            })
          },
          users: joinedUsers
        })
      )

      io.to(parsedEvent.data.id).emit('event:round-started')

      // save round status
      await roundService.updateRoundStatus(round.id, EventStatus.ONGOING)

      // save previous round user points
      if (previousRound?.id)
        await onlineHistoryService.saveUserPoints(
          parsedEvent.users.map(user => ({
            id: user.id,
            point: user.points[previousRound.order] ?? 0
          })),
          previousRound.id
        )
    })
  }

  scheduleJob(
    new Date(new Date(newEvent.startTime).getTime() + (newEvent.rounds.length + 1) * 1 * 60 * 1000),
    async () => {
      const event = await redisClient.get(`event:${newEvent.id}`)

      if (!event) {
        return io.emit('event:not-found')
      }

      await redisClient.del(`event:${newEvent.id}`)

      const parsedEvent = JSON.parse(event) as IEventData

      const updatedEvent = await prisma.event.update({
        where: {
          id: parsedEvent.data.id
        },
        data: {
          status: EventStatus.FINISHED,
          rounds: {
            updateMany: {
              where: {
                eventId: parsedEvent.data.id
              },
              data: {
                status: EventStatus.FINISHED
              }
            }
          }
        },
        select: {
          id: true,
          startTime: true,
          maxPlayers: true,
          status: true,
          title: true,
          description: true,
          tags: true,
          rounds: {
            select: {
              id: true,
              order: true,
              status: true,
              stack: {
                select: {
                  id: true,
                  name: true,
                  thumbnail: true
                }
              },
              game: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      })

      const lastRoundData = parsedEvent.data.rounds.find(
        r => r.order === parsedEvent.data.rounds.length - 1
      )

      if (lastRoundData) {
        await onlineHistoryService.saveUserPoints(
          parsedEvent.users.map(user => ({
            id: user.id,
            point: user.points[lastRoundData.order] ?? 0
          })),
          lastRoundData.id
        )
      }

      io.to(updatedEvent.id).emit('event:finished')
    }
  )

  return newEvent
}

const findEventById = async (id: string, currentUserId?: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      startTime: true,
      maxPlayers: true,
      status: true,
      title: true,
      description: true,
      tags: true,
      rounds: {
        select: {
          id: true,
          order: true,
          status: true,
          startTime: true,
          stack: {
            select: {
              id: true,
              name: true,
              thumbnail: true
            }
          },
          game: {
            select: {
              id: true,
              name: true
            }
          },
          onlineHistory: {
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatarUrl: true
                }
              },
              archievedPoints: true
            },
            orderBy: { archievedPoints: 'desc' },
            take: 1
          }
        },
        orderBy: { order: 'asc' }
      },
      _count: {
        select: {
          joinedUsers: true
        }
      }
    }
  })

  if (!event) throw new HttpError(404, 'Event not found')

  if (event.status === EventStatus.UPCOMING) return event

  const leaderboards = await onlineHistoryService.getLeaderboards(event.id, 10)

  let currentUserPoints: ICurrentUserPoint[] = []
  if (currentUserId) {
    currentUserPoints = await onlineHistoryService.getEventUserPoints(currentUserId, event.id)
  }

  console.log('==> currentUserPoints', currentUserId)

  // normalize data
  const rounds = event.rounds.map(round => {
    const { onlineHistory, ...returnRound } = round

    if (round.onlineHistory.length === 0) return { round, topUser: null }

    const currentUserPoint = currentUserPoints.find(p => p.roundId === round.id)?.archievedPoints

    return {
      ...returnRound,
      topUser: {
        id: round.onlineHistory[0].user.id,
        username: round.onlineHistory[0].user.username,
        avatarUrl: round.onlineHistory[0].user.avatarUrl,
        totalPoints: round.onlineHistory[0].archievedPoints
      },
      currentUserPoint
    }
  })

  return {
    ...event,
    rounds,
    totalJoinedUsers: event._count?.joinedUsers,
    leaderboards
  }
}

const updateEventStatus = async (id: string, status: EventStatus) => {
  return await prisma.event.update({
    where: {
      id
    },
    data: {
      status
    },
    select: {
      id: true,
      startTime: true,
      maxPlayers: true,
      status: true,
      title: true,
      description: true,
      tags: true,
      rounds: {
        select: {
          id: true,
          order: true,
          status: true,
          startTime: true,
          stack: {
            select: {
              id: true,
              name: true,
              thumbnail: true
            }
          },
          game: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
}

const updateEventById = async (id: string, event: UpdateEventReq) => {}

const deleteEventById = async (id: string) => {
  return await prisma.event.delete({
    where: {
      id
    }
  })
}

export default {
  getAllEvents,
  getAllEventsByStatus,
  createEvent,
  findEventById,
  deleteEventById,
  updateEventById
}
