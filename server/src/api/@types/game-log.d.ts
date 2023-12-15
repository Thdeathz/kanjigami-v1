export declare interface CreateUpdateGameLogReq {
  gameStackId: string
  archievedPoints: number
}

export declare interface UserAchievement {
  gameId: string
  stackId: string
  score: number
}

export declare interface GameLogQueryResult {
  archievedPoints: number
  rank: BigInt
}
