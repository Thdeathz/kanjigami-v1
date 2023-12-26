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

export default { getLeaderboards, getOnlineEventsLeaderboards, saveUserPoints }
