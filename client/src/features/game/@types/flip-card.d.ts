declare interface IFlipCardGameContent {
  id: string
  kanji: string
  kunyomi: string
  image: string
}

declare interface ImageContent {
  type: 'image'
  id: string
  image: string
  kunyomi: string
  isVisible: boolean
}

declare interface KanjiContent {
  type: 'kanji'
  id: string
  kanji: string
  isVisible: boolean
}

declare interface ActivedCard {
  card: EventTarget & HTMLDivElement
  kanji: ImageContent | KanjiContent
}
