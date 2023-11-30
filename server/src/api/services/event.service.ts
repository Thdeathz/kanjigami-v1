import { EventStatus } from '@prisma/client'

import { CreateEventRequest, UpdateEventReq } from '../@types/event'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const getAllEvents = async (status: EventStatus, page: number, offset: number) => {
  return await prisma.event.findMany({
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
          },
          onlineHistory: {
            select: {
              user: {
                select: {
                  avatarUrl: true
                }
              }
            },
            orderBy: {
              archievedPoints: 'asc'
            },
            take: 3
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  })
}

const createEvent = async (event: CreateEventRequest) => {
  // const job = scheduleJob(event.startTime, async () => {
  //   console.log('Job running at', event.startTime)
  // })

  const newEvent = await prisma.event.create({
    data: {
      title: event.title,
      description: event.description,
      maxPlayers: event.maxPlayers,
      tags: event.tags,
      startTime: event.startTime,
      rounds: {
        create: event.rounds.map(round => ({
          gameId: round.gameId,
          stackId: round.stackId,
          order: round.order
        }))
      }
    }
  })

  if (!newEvent) throw new HttpError(500, 'Create event failed')
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
      joinedUsers: {
        select: {
          id: true,
          username: true,
          avatarUrl: true
        }
      },
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
              archievedPoints: true,
              user: {
                select: {
                  id: true,
                  avatarUrl: true
                }
              }
            },
            orderBy: {
              archievedPoints: 'desc'
            },
            take: 10
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!event) throw new HttpError(401, 'Event not found')

  return event
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
  createEvent,
  findEventById,
  deleteEventById,
  updateEventById
}
