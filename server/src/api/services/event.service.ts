import { v4 } from 'uuid'

import { CreateEventReq, UpdateEventReq } from '../@types/event'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const select = {
  id: true,
  description: true,
  maxPlayers: true,
  lobbyTime: true,
  status: true,
  tags: true,
  startTime: true,
  rounds: {
    select: {
      id: true,
      stack: {
        select: {
          id: true,
          name: true,
          description: true
        }
      },
      game: {
        select: {
          id: true,
          name: true
        }
      }
    }
  },
  joinedUsers: {
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      rankingScore: true
    }
  }
}

const getAllEvents = async () => {
  return await prisma.event.findMany({
    select
  })
}

const createEvent = async (event: CreateEventReq) => {
  const newEvent = await prisma.event.create({
    data: {
      description: event.description,
      maxPlayers: event.maxPlayers,
      lobbyTime: event.lobbyTime,
      status: 'Upcoming',
      tags: event.tags,
      startTime: event.startTime,
      rounds: {
        create: event.rounds.map(round => ({
          gameId: round.gameId,
          stackId: round.stackId
        }))
      }
    },
    select
  })

  if (!newEvent) throw new HttpError(500, 'Create event failed')

  return newEvent
}

const findEventById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id
    },
    select
  })

  if (!event) throw new HttpError(401, 'Event not found')

  return event
}

const updateEventById = async (id: string, event: UpdateEventReq) => {
  return await prisma.event.update({
    where: {
      id
    },
    data: {
      description: event.description,
      maxPlayers: event.maxPlayers,
      lobbyTime: event.lobbyTime,
      status: event.status,
      tags: event.tags,
      startTime: event.startTime,
      rounds: {
        upsert: event.rounds?.map(round => ({
          where: {
            id: round.roundId ?? v4()
          },
          update: {
            gameId: round.gameId,
            stackId: round.stackId
          },
          create: {
            gameId: round.gameId,
            stackId: round.stackId
          }
        }))
      }
    },
    select
  })
}

const deleteEventById = async (id: string) => {
  return await prisma.event.delete({
    where: {
      id
    },
    select
  })
}

export default {
  getAllEvents,
  createEvent,
  findEventById,
  deleteEventById,
  updateEventById
}
