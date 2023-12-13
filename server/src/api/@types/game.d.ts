import { Kanji } from '@prisma/client'
import { ImageContent, KanjiContent } from './kanji'

export interface GameContent {
  id: string
  kanji: string
  kunyomi: string
  image: string
}

export interface GameData<T> {
  useId: string
  gameId: string
  stackId: string
  score: number
  gameContent: T[]
}

export interface StartGameRequest {
  numberKanji: number
  time: number
}

export interface FlipCardGameContent {
  kanji: string
  id: string
  kunyomi: string
  images: {
    url: string
  }[]
}

export interface ImageContent {
  type: 'image'
  id: string
  image: string
  kunyomi: string
  isVisible: boolean
}

export interface KanjiContent {
  type: 'kanji'
  id: string
  kanji: string
  isVisible: boolean
}

export interface KanjiShooterContent {
  kanji: string
  id: string
  kakikata: string
}

export interface MultipleChoiceContent {
  answer: Pick<Kanji, 'id' | 'kunyomi'>
  options: Pick<Kanji, 'id' | 'kunyomi'>[]
  question:
    | (Pick<Kanji, 'id' | 'kanji'> & { type: 'kanji' })
    | (Pick<Kanji, 'id'> & { type: 'image'; image: string })
}
