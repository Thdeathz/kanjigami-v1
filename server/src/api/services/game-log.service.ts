import { CreateUpdateGameLogReq, GameLogQueryResult, UserAchievement } from '../@types/game-log'
import { TopUser } from '../@types/online-history'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const select = {
  gameStack: {
    select: {
      stack: {
        select: {
          name: true
        }
      },
      game: {
        select: {
          name: true
        }
      }
    }
  },
  user: {
    select: {
      username: true,
      avatarUrl: true
    }
  },
  archievedPoints: true
}

const getLeaderboards = async (stackId: string, limit: number) => {
  const top = await prisma.$queryRaw<TopUser[]>`
    SELECT
      "u"."id",
      "u"."username",
      "u"."avatarUrl",
      SUM("gl"."archievedPoints") AS "totalPoints",
      COUNT("gl"."archievedPoints") AS "totalGames"
    FROM
      "GameLog" AS "gl"
    LEFT JOIN
      "GameStack" AS "gs"
    ON
      "gl"."gameStackId" = "gs"."id"
    LEFT JOIN
      "User" AS "u"
    ON
      "gl"."userId" = "u"."id"
    WHERE
      "gs"."stackId" = ${stackId}
    GROUP BY
      "u"."id"
    ORDER BY
      "totalPoints" DESC
    LIMIT
      ${limit}
  `

  // Nomalize data
  const topUsers = top.map(user => ({
    ...user,
    totalPoints: Number(user.totalPoints),
    totalGames: Number(user.totalGames)
  }))

  return topUsers
}

const createGameLog = async (userId: string, gameLog: CreateUpdateGameLogReq) => {
  try {
    return await prisma.gameLog.create({
      data: {
        archievedPoints: gameLog.archievedPoints,
        user: {
          connect: {
            id: userId
          }
        },
        gameStack: {
          connect: {
            id: gameLog.gameStackId
          }
        }
      },
      select
    })
  } catch (error) {
    throw new HttpError(500, 'Create gamelog failed')
  }
}

const updateGameLog = async (userId: string, gameLog: CreateUpdateGameLogReq) => {
  try {
    return await prisma.gameLog.update({
      where: {
        gameStackId_userId: {
          gameStackId: gameLog.gameStackId,
          userId: userId
        }
      },
      data: {
        archievedPoints: gameLog.archievedPoints
      },
      select
    })
  } catch (error) {
    throw new HttpError(500, 'Internal Server Error')
  }
}

const saveUserScore = async (userId: string, data: UserAchievement) => {
  const gameLog = await prisma.gameLog.findFirst({
    where: {
      userId,
      gameStack: {
        gameId: data.gameId,
        stackId: data.stackId
      }
    }
  })

  return await prisma.gameLog.upsert({
    create: {
      archievedPoints: data.score < 0 ? 0 : data.score,
      user: {
        connect: {
          id: userId
        }
      },
      gameStack: {
        connectOrCreate: {
          create: {
            stack: {
              connect: {
                id: data.stackId
              }
            },
            game: {
              connect: {
                id: data.gameId
              }
            }
          },
          where: {
            gameId_stackId: {
              gameId: data.gameId,
              stackId: data.stackId
            }
          }
        }
      }
    },
    update: {
      archievedPoints: data.score,
      user: {
        connect: {
          id: userId
        }
      },
      gameStack: {
        connectOrCreate: {
          create: {
            stack: {
              connect: {
                id: data.stackId
              }
            },
            game: {
              connect: {
                id: data.gameId
              }
            }
          },
          where: {
            gameId_stackId: {
              gameId: data.gameId,
              stackId: data.stackId
            }
          }
        }
      }
    },
    where: {
      gameStackId_userId: {
        gameStackId: gameLog?.gameStackId ?? ' ',
        userId: userId
      }
    },
    select: {
      gameStackId: true
    }
  })
}

const getGameLogDetail = async (userId: string, gameStackId: string) => {
  const result = await prisma.$queryRaw<GameLogQueryResult[]>`
    SELECT
      "gl"."archievedPoints",
      RANK() OVER (ORDER BY "gl"."archievedPoints" DESC) AS "rank"
    FROM
      "GameLog" AS "gl"
    WHERE
      "gl"."gameStackId" = ${gameStackId}
    GROUP BY
      "gl"."userId",
      "gl"."archievedPoints"
    HAVING
      "gl"."userId" = ${userId}
  `

  // Normalize data
  const gameLog = {
    archievedPoints: Number(result[0].archievedPoints),
    rank: Number(result[0].rank)
  }

  return gameLog
}

export default {
  createGameLog,
  updateGameLog,
  getLeaderboards,
  saveUserScore,
  getGameLogDetail
}
