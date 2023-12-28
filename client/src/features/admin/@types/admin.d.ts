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

declare interface IGameItem {
  id: string
  name: string
  thumbnail: string
}

declare interface CreateKanji {
  kanji: string
  onyomi: string
  kunyomi: string
  image: FilePreview
  vocabulary: {
    yomikata: string
    meaning: string
    example: {
      example: string
      meaning: string
    }
  }
}

declare interface CreateStackRequest {
  title: string
  description: string
  image: string
  topic: string
  kanjis: CreateKanji[]
}
s
