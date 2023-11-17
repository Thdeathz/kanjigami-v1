export declare interface CreateStackReq {
  name: string
  description: string
  topic: {
    name: string
    description?: string
  }
  gameStacks: {
    gameId: string
  }[]
}
