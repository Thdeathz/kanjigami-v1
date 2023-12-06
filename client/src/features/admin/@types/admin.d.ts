declare interface ISearchStackResult {
  id: string
  name: string
  thumbnail: string
}

declare interface CreateOnlineEvent {
  title: string
  description: string
  maxPlayers: number
  startTime: string
  tags: string
  thumbnail: FilePreview
  rounds: NewRound[]
}

declare interface NewRound {
  game: {
    id?: string
    name?: string
  }
  stack: {
    id?: string
    thumbnail?: string
  }
}

declare interface IOnlineEventItem {
  id: string
  title: string
  description: string
  maxPlayers: number
  startTime: string
  tags: string
  status: OnlineBattleStatus
  thumbnail: string
  totalRounds: number
  totalJoinedUsers: number
}

declare interface IStackItem {
  id: string
  name: string
  description: string
  thumbnail: string
  totalKanjis: number
  totalFollowers: number
}

declare interface IUserItem {
  id: string
  username: string
  avatarUrl: string
  roles: string[]
  account: {
    email: string
    isActive: boolean
  }
  totalGames: number
}
