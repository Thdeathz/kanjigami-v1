import HttpError from '../helpers/httpError'
import prisma from '../databases/init.prisma'
import { TopUser } from '../@types/online-history'

const getLeaderboards = async (eventId: string, limit: number) => {
  const top = await prisma.$queryRaw<TopUser[]>`
    SELECT 
      "User"."id", 
      "User"."avatarUrl", 
      "User"."username", 
      SUM("OnlineHistory"."archievedPoints") as "totalPoints"
    FROM "OnlineHistory"
    JOIN "User" ON "OnlineHistory"."userId" = "User"."id"
    WHERE "roundId" IN (
      SELECT id
      FROM "Round"
      WHERE "eventId" = ${eventId}
    )
    GROUP BY "User"."id"
    ORDER BY "totalPoints" DESC
    LIMIT ${limit}
  `

  // Convert totalPoints from bigInt to number
  return top.map(user => ({
    ...user,
    totalPoints: Number(user.totalPoints)
  }))
}

const getOnlineEventsLeaderboards = async () => {
  const top = await prisma.$queryRaw<TopUser[]>`
    SELECT 
      "User"."id", 
      "User"."avatarUrl", 
      "User"."username", 
      SUM("OnlineHistory"."archievedPoints") as "totalPoints",
      COUNT("OnlineHistory"."roundId") as "totalGames"
    FROM "OnlineHistory"
    JOIN "User" ON "OnlineHistory"."userId" = "User"."id"
    WHERE "roundId" IN (
      SELECT id
      FROM "Round"
      WHERE "eventId" IN (
        SELECT id
        FROM "Event"
        WHERE "status" = 'FINISHED'
      )
    )
    GROUP BY "User"."id"
    ORDER BY "totalPoints" DESC
    LIMIT 10
  `

  if (!top) throw new HttpError(404, 'Leaderboards not found')

  // Convert totalPoints from bigInt to number
  return top.map(user => ({
    ...user,
    totalPoints: Number(user.totalPoints),
    totalGames: Number(user.totalGames)
  }))
}

const saveUserPoints = async (usersData: { id: string; point: number }[], roundId: string) => {
  return prisma.onlineHistory.createMany({
    data: usersData.map(user => ({
      userId: user.id,
      roundId,
      archievedPoints: user.point
    }))
  })
}

const getEventUserPoints = async (userId: string, eventId: string) => {
  const userPoints = await prisma.onlineHistory.findMany({
    where: {
      userId,
      round: {
        eventId
      }
    },
    select: {
      roundId: true,
      archievedPoints: true
    }
  })

  if (!userPoints) return []

  return userPoints
}

const getLastestUserOnlineStats = async (userId: string) => {
  const lastestEvent = await prisma.event.findFirst({
    where: {
      status: 'FINISHED',
      rounds: {
        some: {
          onlineHistory: {
            some: {
              userId
            }
          }
        }
      }
    },
    select: {
      id: true,
      title: true,
      rounds: {
        select: {
          id: true,
          stack: {
            select: {
              id: true,
              thumbnail: true
            }
          },
          onlineHistory: {
            select: {
              userId: true,
              archievedPoints: true
            },
            orderBy: {
              archievedPoints: 'desc'
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 1
  })

  if (!lastestEvent) return null

  // normalize data
  const result = lastestEvent.rounds.map(round => {
    let rank = 0
    const userHistory = round.onlineHistory.find((history, index) => {
      rank = index + 1
      return history.userId === userId
    })

    if (!userHistory) return null

    return {
      id: round.id,
      stack: round.stack,
      onlineHistory: {
        archievedPoints: userHistory.archievedPoints,
        rank
      }
    }
  })

  return {
    ...lastestEvent,
    rounds: result.filter(round => round !== null)
  }
}

export default {
  getLeaderboards,
  getOnlineEventsLeaderboards,
  saveUserPoints,
  getEventUserPoints,
  getLastestUserOnlineStats
}
