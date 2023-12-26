declare interface KanjiQuestion {
  id: string
  kanji: string
  type: 'kanji'
}

declare interface ImageQuestion {
  id: string
  type: 'image'
  image: string
}

declare interface Option {
  id: string
  option: string
}

declare interface IMultipleChoiceGameContent {
  question: KanjiQuestion | ImageQuestion
  options: Option[]
  selectedAnswer?: number
}

declare type MultipleChoiceGameContent = IMultipleChoiceGameContent[]
