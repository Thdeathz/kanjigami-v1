export type GetGameContentRequest = {
  userId: string
  sessionId: string
}

export type UpdateGameStatusRequest = {
  userId: string
  sessionId: string
  kanjiId: string
}

export type SaveGameScoreRequest = {
  userId: string
  sessionId: string
  gameId: string
  stackId: string
  score: number
}

export type UserSubmitAnswerRequest = {
  userId: string
  sessionId: string
  gameContent: {
    question: number
    selectedAnswer: number
  }[]
}
