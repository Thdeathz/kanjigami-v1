export declare interface CreateStackReq {
  name: string
  description: string
  thumbnail?: string
  topic: string
  gameStacks: {
    gameId: string
  }[]
}

export declare interface FullCreateStackReq extends CreateStackReq {
  kanjis: {
    kanji: string
    kunyomi: string
    onyomi: string
    kakikata: string
    meaning: string
    imageUrl: string[] | null
    vocabularies: {
      yomikata: string
      meaning: string
      example: {
        example: string
        meaning: string
      }
    }
  }[]
}
