export declare interface CreateEventRequest {
  title: string
  description: string
  maxPlayers: number
  startTime: Date
  tags: string
  rounds: {
    gameId: string
    stackId: string
    order: number
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
