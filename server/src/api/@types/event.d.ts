import { EventStatus } from '@prisma/client'

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

export type GameContent =
  | KanjiShooterContent[]
  | (ImageContent | KanjiContent)[]
  | MultipleChoiceContent[]

export declare interface IOngoingEvent {
  id: string
  startTime: Date
  maxPlayers: number
  status: EventStatus
  title: string
  description: string
  tags: string
  rounds: {
    id: string
    status: EventStatus
    order: number
    game: {
      id: string
      name: string
    }
    stack: {
      id: string
      name: string
      thumbnail: string
    }
    gameContent?: GameContent
  }[]
}
