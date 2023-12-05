export declare interface CreateEventRequest {
  title: string
  description: string
  maxPlayers: string
  startTime: Date
  tags: string
  thumbnail?: string
  rounds: {
    gameId: string
    stackId: string
    order: string
  }[]
}

export declare interface UpdateEventReq {
  description?: string
  maxPlayers?: number
  lobbyTime?: number
  startTime?: Date
  tags?: string
  status?: string
  rounds?: {
    roundId?: string
    gameId: string
    stackId: string
  }[]
}
