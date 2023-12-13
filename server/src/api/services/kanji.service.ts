import { KanjiShooterContent, MultipleChoiceContent } from '../@types/game'
import { FlipCardGameContent, ImageContent, KanjiContent } from '../@types/game'
import prisma from '../databases/init.prisma'
import { shuffleArray } from '../helpers/array.helper'
import HttpError from '../helpers/httpError'
import { randomPick } from '../helpers/random.helpter'

const getGameContent = async (gameId: string, stackId: string, count: number) => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    },
    select: {
      id: true,
      name: true
    }
  })

  if (!game) throw new HttpError(404, 'No game found')

  switch (game.name) {
    case 'Blind Flip Card':
      return await getFlipCardContent(stackId, count)
    case 'Kanji Shooter':
      return await getKanjiShooterContent(stackId)
    case 'Multiple Choice':
      return await getMultipleChoiceContent(stackId, count)
    default:
      throw new HttpError(500, 'Game not supported')
  }
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

const getFlipCardContent = async (stackId: string, count: number) => {
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

  if (!kanjis || kanjis.length < count) throw new HttpError(404, 'No kanji found')

  const data = (kanjis as FlipCardGameContent[]).reduce(
    (data: (ImageContent | KanjiContent)[], item: FlipCardGameContent) => {
      return [
        ...data,
        {
          type: 'image',
          id: item.id,
          image: item.images[0].url,
          kunyomi: item.kunyomi,
          isVisible: true
        } as ImageContent,
        {
          type: 'kanji',
          id: item.id,
          kanji: item.kanji,
          isVisible: true
        } as KanjiContent
      ]
    },
    []
  )

  const result = shuffleArray<ImageContent | KanjiContent>(data)

  return result
}

const getKanjiShooterContent = async (stackId: string): Promise<KanjiShooterContent[]> => {
  const kanjis = await prisma.kanji.findMany({
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
      kakikata: true
    }
  })

  if (!kanjis) throw new HttpError(404, 'No kanji found')

  const result = shuffleArray<KanjiShooterContent>(kanjis)

  return result
}

const getMultipleChoiceContent = async (stackId: string, count: number) => {
  const kanjis = await prisma.kanji.findMany({
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
    }
  })

  if (!kanjis || kanjis.length < count) throw new HttpError(404, 'No kanji found')

  const questions: MultipleChoiceContent[] = []

  for (let i = 0; i < count; i++) {
    const answer = kanjis[i % kanjis.length]
    const wrongAnswers = shuffleArray(kanjis.filter(kanji => kanji.id !== answer.id)).slice(0, 3)
    const options = shuffleArray([answer, ...wrongAnswers])

    if (Math.random() < 0.3) {
      questions.push({
        answer: {
          id: answer.id,
          kunyomi: answer.kunyomi
        },
        options: options.map(option => ({
          id: option.id,
          kunyomi: option.kanji
        })),
        question: {
          type: 'image',
          id: answer.id,
          image: answer.images[0].url
        }
      })
      continue
    }

    questions.push({
      answer: {
        id: answer.id,
        kunyomi: answer.kunyomi
      },
      options: options.map(option => ({
        id: option.id,
        kunyomi: option.kunyomi
      })),
      question: {
        type: 'kanji',
        id: answer.id,
        kanji: answer.kanji
      }
    })
  }

  return questions
}

export default {
  getGameContent,
  getKanjiDetail,
  getFlipCardContent,
  getKanjiShooterContent,
  getMultipleChoiceContent
}
