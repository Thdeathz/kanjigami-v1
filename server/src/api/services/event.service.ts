import { EventStatus } from '@prisma/client'

import { CreateEventRequest, UpdateEventReq } from '../@types/event'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'
import onlineHistoryService from './online-history.service'
import { scheduleJob } from 'node-schedule'

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

const getAllEventsByStatus = async (status: EventStatus, page: number, offset: number) => {
  const total = await prisma.event.count({
    where: {
      status
    }
  })

  const events = await prisma.event.findMany({
    skip: (page - 1) * offset,
    take: offset,
    where: {
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
    orderBy: { startTime: 'asc' }
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
          order: Number(round.order)
        }))
      }
    }
  })

  if (!newEvent) throw new HttpError(500, 'Create event failed')

  const job = scheduleJob(new Date(event.startTime), async () => {
    const updatedEvent = await prisma.event.update({
      where: {
        id: newEvent.id
      },
      data: {
        status: EventStatus.ONGOING
      }
    })

    console.log('==> event started', updatedEvent.id)
  })

  return newEvent
}

const findEventById = async (id: string) => {
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

  return {
    ...event,
    totalJoinedUsers: event._count?.joinedUsers,
    leaderboards
  }
}

const updateEventById = async (id: string, event: UpdateEventReq) => {
  // return await prisma.event.update({
  //   where: {
  //     id
  //   },
  //   data: {
  //     description: event.description,
  //     maxPlayers: event.maxPlayers,
  //     lobbyTime: event.lobbyTime,
  //     status: event.status,
  //     tags: event.tags,
  //     startTime: event.startTime,
  //     rounds: {
  //       upsert: event.rounds?.map(round => ({
  //         where: {
  //           id: round.roundId ?? v4()
  //         },
  //         update: {
  //           gameId: round.gameId,
  //           stackId: round.stackId
  //         },
  //         create: {
  //           gameId: round.gameId,
  //           stackId: round.stackId
  //         }
  //       }))
  //     }
  //   },
  //   select
  // })
}

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
