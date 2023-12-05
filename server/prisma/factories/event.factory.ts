import { faker, fakerJA } from '@faker-js/faker'
import { EventStatus, Game, Stack } from '@prisma/client'

import { AccountWithUser } from '../seeders/account.seeder'

type OnlineHistoryFactory = {
  userId: string
  archievedPoints: number
}

type EventFactory = {
  startTime: Date
  maxPlayers: number
  status: EventStatus
  title: string
  description: string
  tags: string
  joinedUsers: AccountWithUser[]
  rounds: {
    order: number
    status: EventStatus
    gameId: string
    stackId: string
    onlineHistory: OnlineHistoryFactory[]
  }[]
}

export const eventFactory = async (accounts: AccountWithUser[], games: Game[], stacks: Stack[]) => {
  let events: EventFactory[] = []

  Array.from(Array(30)).map(() => {
    const status = faker.helpers.arrayElement([EventStatus.UPCOMING, EventStatus.FINISHED])
    const title = faker.word.words({ count: { min: 2, max: 4 } })
    const description = faker.lorem.sentence(8)
    const tags = fakerJA.person.firstName()
    const maxPlayers = faker.number.int({ min: 5, max: 12 })

    let startTime = faker.date.future()
    let joinedUsers: AccountWithUser[] = faker.helpers.shuffle(accounts).slice(0, maxPlayers)
    if (status === EventStatus.FINISHED) startTime = faker.date.past()

    const maxRounds = faker.number.int({ min: 6, max: 12 })
    const rounds = Array.from(Array(maxRounds)).map((_, index) => {
      const order = index + 1

      let roundStatus: EventStatus = EventStatus.UPCOMING
      let onlineHistory: OnlineHistoryFactory[] = []
      if (status === EventStatus.FINISHED) {
        roundStatus = EventStatus.FINISHED
        joinedUsers.map(account => {
          const archievedPoints = faker.number.int({ min: 20, max: 100 })
          onlineHistory.push({
            userId: account.user.id,
            archievedPoints
          })
        })
      }

      const gameId = faker.helpers.arrayElement(games).id
      const stackId = faker.helpers.arrayElement(stacks).id

      return {
        order,
        status: roundStatus,
        gameId,
        stackId,
        onlineHistory
      }
    })

    events.push({
      startTime,
      maxPlayers,
      status,
      title,
      description,
      tags,
      joinedUsers,
      rounds
    })
  })

  return events
}
