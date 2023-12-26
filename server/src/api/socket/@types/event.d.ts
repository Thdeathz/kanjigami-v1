import { IOngoingEvent } from '~/api/@types/event'

export interface IJoinedUser {
  id: string
  username: string
  avatarUrl: string
  points: number[]
}

export interface IEventData {
  data: IOngoingEvent
  users: IJoinedUser[]
}
