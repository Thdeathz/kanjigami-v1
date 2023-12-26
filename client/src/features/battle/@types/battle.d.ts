declare type OnlineBattleStatus = 'ONGOING' | 'UPCOMING' | 'FINISHED'

declare interface ITopUser {
  id: string
  username: string
  avatarUrl: string
  totalPoints: number
  totalGames?: number
}

declare interface IBattleRound {
  id: string
  order: number
  status: OnlineBattleStatus
  startTime: Date
  gameContent?: FlipCardGameContent | MultipleChoiceGameContent
  stack: Pick<Stack, 'id' | 'name' | 'thumbnail'>
  game: IGame
  topUser?: ITopUser
  currentUserPoint?: number
}

declare interface IOnlineBattle {
  id: string
  title: string
  description: string
  maxPlayers: number
  startTime: Date
  status: OnlineBattleStatus
  tags: string
  rounds: IBattleRound[]
  leaderboards?: ITopUser[]
  totalJoinedUsers?: number
}
