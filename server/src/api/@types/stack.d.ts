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

export declare interface FullCreateStackReq extends CreateStackReq {
  kanjis: {
    kanji: string
    kunyomi: string
    onyomi: string
    meaning: string
    imageUrl: string[] | null
  }[]
}
