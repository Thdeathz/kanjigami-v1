import { Event, Game, PrismaClient, Topic } from '@prisma/client'
import { TopicWithStacks } from './topic.seeder'
import { faker } from '@faker-js/faker'
import { AccountWithUser } from './account.seeder'

const prisma = new PrismaClient()

const eventSeeder = async (
  games: Game[],
  topicList: TopicWithStacks[],
  accounts: AccountWithUser[]
): Promise<Event[]> => {
  let eventList: Event[] = []
  await Promise.all(
    Array.from(Array(20)).map(async () => {
      const newEvent = await prisma.event.create({
        data: {
          description: faker.lorem.sentence(),
          maxPlayers: faker.number.int({ min: 10, max: 20 }),
          lobbyTime: 10,
          status: faker.helpers.arrayElement(['Upcoming', 'Onoging', 'Finished']),
          tags: faker.lorem.word({ length: { min: 5, max: 7 } }),
          rounds: {
            create: Array.from(Array(8)).map(() => ({
              gameId: faker.helpers.arrayElement(games).id,
              stackId:
                topicList[faker.number.int({ min: 0, max: 3 })].stacks[
                  faker.number.int({ min: 0, max: 9 })
                ].id
            }))
          },
          startTime: new Date(),
          joinedUsers: {
            connect: Array.from(Array(10).keys()).map(each => ({
              id: accounts[each + 1].user.id
            }))
          }
        },
        include: {
          rounds: true,
          joinedUsers: true
        }
      })

      eventList.push(newEvent)
    })
  )

  return eventList
}

export default eventSeeder
