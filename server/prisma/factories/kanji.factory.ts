import { fakerJA } from '@faker-js/faker'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'

type Kanji = {
  kanji: string
  hiragana: string
  romanji: string
  meaning: string
  image: string
}

const kuroshiro = new Kuroshiro()

export const kanjiFactory = async () => {
  const kanjis: Kanji[] = []
  await kuroshiro.init(new KuromojiAnalyzer())

  await Promise.all(
    Array.from(Array(100)).map(async () => {
      const kanji = fakerJA.person.firstName()
      const hiragana = await kuroshiro.convert(kanji, { to: 'hiragana' })
      const romanji = await kuroshiro.convert(kanji, { to: 'romaji' })

      kanjis.push({
        kanji,
        hiragana,
        romanji,
        meaning: fakerJA.lorem.sentence(),
        image: fakerJA.image.url()
      })
    })
  )

  return kanjis
}
