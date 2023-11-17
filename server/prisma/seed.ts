import { Game, PrismaClient, Stack, Topic } from '@prisma/client'

const prisma = new PrismaClient()

const gameTypes = ['Blind Flip Card', 'Kanji Shooter', 'Typing Racing']
const topics = ['家族', 'スポーツ', '飲み物', '観光']
const events = ['Birthday', 'Anniversary', 'Wedding']

async function seed() {
  const games: Game[] = []
  await Promise.all(
    gameTypes.map(async gameType => {
      const newGame = await prisma.game.create({
        data: {
          name: gameType
        }
      })
      games.push(newGame)
    })
  )

  const topicList: any = []
  await Promise.all(
    topics.map(async topic => {
      const newTopic = await prisma.topic.create({
        data: {
          name: topic,
          description: 'This is a description of the topic',
          stacks: {
            create: [
              {
                name: `${topic} Stack 1`,
                description: 'This is a description of the stack'
              },
              {
                name: `${topic} Stack 2`,
                description: 'This is a description of the stack'
              }
            ]
          }
        },
        include: {
          stacks: true
        }
      })
      topicList.push(newTopic)
    })
  )

  let countUsr = 0
  const eventList: any = []
  await Promise.all(
    events.map(async (event, index) => {
      const newEvent = await prisma.event.create({
        data: {
          description: 'This is a description of the event',
          maxPlayers: 4,
          lobbyTime: 10,
          status: 'Upcoming',
          tags: 'tag',
          rounds: {
            create: [
              {
                gameId: games[index].id,
                stackId: topicList[index].stacks[0].id
              }
            ]
          },
          startTime: new Date(),
          joinedUsers: {
            create: [
              {
                username: `user${countUsr++}`,
                rankingScore: countUsr * 10,
                roles: ['USER']
              }
            ]
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
}

seed()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
