declare interface IStack {
  id: string
  name: string
  description: string
  thumbnail: string
  isFollowed?: boolean
}

declare interface CreateKanji {
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  image: string
  vocabulary: {
    yomikata: string
    meaning: string
  }
  examples: {
    example: string
    meaning: string
  }[]
}

declare interface CreateStackRequest {
  title: string
  description: string
  image: string
  tags: string[]
  kanjis: CreateKanji[]
}

declare interface IGame {
  id: string
  name: string
  thumbnail: string
}

declare interface IStackDetail {
  id: string
  name: string
  description: string
  thumbnail: string
  kanjis: {
    id: string
    kanji: string
  }[]
  leaderboards: ITopUser[]
}

declare interface IKanji {
  id: string
  kanji: string
  kunyomi: string
  onyomi: string
  images: {
    url: string
  }[]
  vocabularies: {
    yomikata: string
    meaning: string
    examples: {
      example: string
      meaning: string
    }[]
  }[]
}

type GameStatusType = {
  life: number
  time: Date
  score: number
}
