import { Game, GameLog, Stack } from '@prisma/client'

import prisma from './prismaClient'
import { gameLogFactory } from '../factories/game-log.factory'
import { AccountWithUser } from './account.seeder'

const gameLogSeeder = async (games: Game[], stacks: Stack[], accounts: AccountWithUser[]) => {
  console.log('🌱 Seeding game logs...')
  let gameLogs: GameLog[] = []

  const gameLogsData = await gameLogFactory(games, stacks, accounts)

  await Promise.all(
    gameLogsData.map(async gameLog => {
      const newGameLog = await prisma.gameLog.create({
        data: {
          archievedPoints: gameLog.archievedPoints,
          user: {
            connect: {
              id: gameLog.account.user.id
            }
          },
          gameStack: {
            create: {
              game: {
                connect: {
                  id: gameLog.game.id
                }
              },
              stack: {
                connect: {
                  id: gameLog.stack.id
                }
              }
            }
          }
        }
      })

      gameLogs.push(newGameLog)
    })
  )

  return gameLogs
}

export default gameLogSeeder
