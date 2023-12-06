import { CreateUpdateGameLogReq } from '../@types/game-log'
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

const getAllGameLog = async () => {
  try {
    return await prisma.gameLog.findMany({
      select
    })
  } catch (error) {
    throw new HttpError(500, 'Internal Server Error')
  }
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

export default {
  getAllGameLog,
  createGameLog,
  updateGameLog,
  getLeaderboards
}
