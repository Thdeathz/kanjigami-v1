function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export const getContentArray = (content: IFlipCardGameContent[]) => {
  const imageContent = content.map(item => ({
    type: 'image',
    id: item.id,
    image: item.image,
    kunyomi: item.kunyomi
  })) as ImageContent[]

  const kanjiContent = content.map(item => ({
    type: 'kanji',
    id: item.id,
    kanji: item.kanji
  })) as KanjiContent[]

  const result = shuffleArray<ImageContent | KanjiContent>([...imageContent, ...kanjiContent])

  return result
}
