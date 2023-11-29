import { Stack, Topic } from '@prisma/client'

import prisma from './prismaClient'
import { stackFactory } from '../factories/stack.factory'

const stackSeeder = async (topics: Topic[]): Promise<Stack[]> => {
  console.log('🌱 Seeding stacks...')
  let stackList: Stack[] = []

  const stacksData = await stackFactory(topics)

  await Promise.all(
    stacksData.map(async stack => {
      const newStack = await prisma.stack.create({
        data: {
          name: stack.name,
          description: stack.description,
          thumbnail: stack.thumbnail,
          topic: {
            connect: {
              id: stack.topic.id
            }
          },
          kanjis: {
            create: stack.kanjis.map(each => ({
              kanji: each.kanji,
              kunyomi: each.hiragana,
              onyomi: each.hiragana,
              meaning: each.meaning,
              images: {
                create: {
                  url: each.image
                }
              },
              vocabularies: {
                create: {
                  yomikata: each.vocabulary.yomikata,
                  meaning: each.vocabulary.meaning,
                  examples: {
                    create: {
                      example: each.vocabulary.example.example,
                      meaning: each.vocabulary.example.meaning
                    }
                  }
                }
              }
            }))
          }
        }
      })
      stackList.push(newStack)
    })
  )

  console.log('🌱 Seeding stacks completed!')

  return stackList
}

export default stackSeeder
