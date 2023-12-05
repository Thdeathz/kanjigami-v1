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
