import { faker, fakerJA } from '@faker-js/faker'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import wanakana from 'wanakana'

export type KanjiFactory = {
  kanji: string
  hiragana: string
  romanji: string
  kakikata: string
  meaning: string
  image: string
  vocabulary: {
    yomikata: string
    meaning: string
    example: {
      example: string
      meaning: string
    }
  }
}

const kuroshiro = new Kuroshiro()

export const kanjiFactory = async (number: number) => {
  const kanjis: KanjiFactory[] = []
  await kuroshiro.init(new KuromojiAnalyzer())

  await Promise.all(
    Array.from(Array(number)).map(async () => {
      const kanji = fakerJA.person.firstName()
      const hiragana = await kuroshiro.convert(kanji, { to: 'hiragana' })
      const romanji = await kuroshiro.convert(kanji, { to: 'romaji' })
      const kakikata = wanakana.toRomaji(hiragana)

      kanjis.push({
        kanji,
        hiragana,
        romanji,
        kakikata,
        meaning: faker.lorem.sentence(),
        image: faker.image.url(),
        vocabulary: {
          yomikata: romanji,
          meaning: faker.lorem.sentences({ min: 5, max: 8 }),
          example: {
            example: fakerJA.lorem.sentence(),
            meaning: faker.lorem.sentence()
          }
        }
      })
    })
  )

  return kanjis
}
