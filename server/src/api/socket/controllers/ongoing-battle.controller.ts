import { IEventData, IJoinedUser } from '../@types/event'

const getLeaderboard = (event: IEventData) => {
  // Calculate total points for each user
  const usersWithTotalPoints = event.users.map(user => ({
    ...user,
    totalPoints: user.points.reduce((total, value) => total + value, 0)
  }))

  // Sort users by total points
  return usersWithTotalPoints.sort((a, b) => b.totalPoints - a.totalPoints)
}

const getRoundTopUser = (roundOrder: number, users: IJoinedUser[]) => {
  if (users.length === 0) return undefined

  const topUser = users.reduce((prev, curr) => {
    const prevScore = prev.points[roundOrder] || 0
    const currScore = curr.points[roundOrder] || 0

    return prevScore > currScore ? prev : curr
  })

  return {
    id: topUser.id,
    username: topUser.username,
    avatarUrl: topUser.avatarUrl,
    totalPoints: topUser.points[roundOrder]
  }
}

export default {
  getLeaderboard,
  getRoundTopUser
}
