import { faker } from '@faker-js/faker'
import { Game, Stack } from '@prisma/client'

import { AccountWithUser } from '../seeders/account.seeder'

type GameLogFactory = {
  archievedPoints: number
  game: Game
  stack: Stack
  account: AccountWithUser
}

export const gameLogFactory = async (
  games: Game[],
  stacks: Stack[],
  accounts: AccountWithUser[]
) => {
  let gameLogs: GameLogFactory[] = []

  await Promise.all(
    Array.from(Array(500)).map(async () => {
      const archievedPoints = faker.number.int({ min: 50, max: 500 })
      const game = faker.helpers.arrayElement(games)
      const stack = faker.helpers.arrayElement(stacks)
      const account = faker.helpers.arrayElement(accounts)

      gameLogs.push({
        archievedPoints,
        game,
        stack,
        account
      })
    })
  )

  return gameLogs
}
