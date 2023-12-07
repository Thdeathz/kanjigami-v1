import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'
import { randomPick } from '../helpers/random.helpter'

const getFlipCardGameContent = async (stackId: string, count: number) => {
  const itemCount = await prisma.kanji.count({
    where: {
      stack: {
        some: {
          id: stackId
        }
      }
    }
  })
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - count)
  const orderBy = randomPick(['id', 'kanji', 'kunyomi'])
  const orderDir = randomPick(['asc', 'desc'])

  const kanjis = await prisma.kanji.findMany({
    take: count,
    skip,
    where: {
      stack: {
        some: {
          id: stackId
        }
      }
    },
    select: {
      id: true,
      kanji: true,
      kunyomi: true,
      images: {
        select: {
          url: true
        }
      }
    },
    orderBy: {
      [orderBy]: orderDir
    }
  })

  if (!kanjis) throw new HttpError(404, 'No kanji found')

  // Normalize the data
  const kanjisResult = kanjis.map(kanji => ({
    id: kanji.id,
    kanji: kanji.kanji,
    kunyomi: kanji.kunyomi,
    image: kanji.images[0].url
  }))

  return kanjisResult
}

const getKanjiDetail = async (kanjiId: string) => {
  const kanji = await prisma.kanji.findUnique({
    where: {
      id: kanjiId
    },
    select: {
      id: true,
      kanji: true,
      kunyomi: true,
      onyomi: true,
      images: {
        select: {
          url: true
        }
      },
      vocabularies: {
        select: {
          yomikata: true,
          meaning: true,
          examples: {
            select: {
              example: true,
              meaning: true
            }
          }
        }
      }
    }
  })

  if (!kanji) throw new HttpError(404, 'No kanji found')

  return kanji
}

export default {
  getFlipCardGameContent,
  getKanjiDetail
}
