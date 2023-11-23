interface CreateKanji {
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

interface CreateStackRequest {
  title: string
  description: string
  image: string
  tags: string[]
  kanjis: CreateKanji[]
}
