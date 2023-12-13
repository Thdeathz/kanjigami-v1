import { Game, GameLog, Stack } from '@prisma/client'

import prisma from './prismaClient'
import { gameLogFactory } from '../factories/game-log.factory'
import { AccountWithUser } from './account.seeder'

const gameLogSeeder = async (games: Game[], stacks: Stack[], accounts: AccountWithUser[]) => {
  console.log('🌱 Seeding game logs...')
  let gameLogs: GameLog[] = []

  const gameLogsData = await gameLogFactory(games, stacks, accounts)

  for (const gameLog of gameLogsData) {
    const existingGameLogs = await prisma.gameLog.findFirst({
      where: {
        userId: gameLog.account.user.id,
        gameStack: {
          game: {
            id: gameLog.game.id
          },
          stack: {
            id: gameLog.stack.id
          }
        }
      }
    })

    const newGameLog = await prisma.gameLog.upsert({
      create: {
        archievedPoints: gameLog.archievedPoints,
        user: {
          connect: {
            id: gameLog.account.user.id
          }
        },
        gameStack: {
          connectOrCreate: {
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
            },
            where: {
              gameId_stackId: {
                gameId: gameLog.game.id,
                stackId: gameLog.stack.id
              }
            }
          }
        }
      },
      update: {
        archievedPoints: gameLog.archievedPoints,
        user: {
          connect: {
            id: gameLog.account.user.id
          }
        },
        gameStack: {
          connectOrCreate: {
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
            },
            where: {
              gameId_stackId: {
                gameId: gameLog.game.id,
                stackId: gameLog.stack.id
              }
            }
          }
        }
      },
      where: {
        gameStackId_userId: {
          gameStackId: existingGameLogs?.gameStackId ?? '',
          userId: gameLog.account.user.id
        }
      }
    })

    gameLogs.push(newGameLog)
  }

  return gameLogs
}

export default gameLogSeeder
