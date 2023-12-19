declare interface IUser {
  id: string
  username: string
  avatarUrl: string
  email: string
  roles: ROLE[]
  active: boolean
}

declare interface IUserStats {
  stackStats: {
    totalPoints: number
    totalGames: number
  }
  onlineStats: {
    totalPoints: number
    totalGames: number
  }
}
