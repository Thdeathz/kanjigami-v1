declare type OnlineEventStatus = 'ongoing' | 'upcoming' | 'finished'

declare interface CreateOnlineEvent {
  name: string
  description: string
  start_time: string
  end_time: string
  max_participants: number
  tags: string[]
  image: string
  link: string
  host: string
}

declare interface NewRound {
  title: string
  gameId?: string
  stackId?: string
}
