import { Event, Game, Stack } from '@prisma/client'

import prisma from './prismaClient'
import { AccountWithUser } from './account.seeder'
import { eventFactory } from '../factories/event.factory'

const eventSeeder = async (
  games: Game[],
  accounts: AccountWithUser[],
  stacks: Stack[]
): Promise<Event[]> => {
  console.log('🌱 Seeding events...')
  let eventList: Event[] = []

  const eventsData = await eventFactory(accounts, games, stacks)

  await Promise.all(
    eventsData.map(async event => {
      const newEvent = await prisma.event.create({
        data: {
          title: event.title,
          description: event.description,
          maxPlayers: event.maxPlayers,
          status: event.status,
          tags: event.tags,
          rounds: {
            create: event.rounds.map(round => ({
              order: round.order,
              status: round.status,
              game: {
                connect: {
                  id: round.gameId
                }
              },
              stack: {
                connect: {
                  id: round.stackId
                }
              },
              onlineHistory: {
                create: round.onlineHistory.map(history => ({
                  user: {
                    connect: {
                      id: history.userId
                    }
                  },
                  archievedPoints: history.archievedPoints
                }))
              }
            }))
          },
          startTime: event.startTime,
          joinedUsers: {
            connect: event.joinedUsers.map(account => ({
              id: account.user.id
            }))
          }
        }
      })

      eventList.push(newEvent)
    })
  )

  console.log('🌱 Seeding events completed!')

  return eventList
}

export default eventSeeder
