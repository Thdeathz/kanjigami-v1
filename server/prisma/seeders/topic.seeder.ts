import { faker, fakerJA } from '@faker-js/faker'
import { PrismaClient, Stack, Topic } from '@prisma/client'
import { kanjiFactory } from '../factories/kanji.factory'

export type TopicWithStacks = Topic & { stacks: Stack[] }

const prisma = new PrismaClient()

const topicFactory = ['家族', 'スポーツ', '飲み物', '観光']

const topicSeeder = async (): Promise<TopicWithStacks[]> => {
  let topicList: TopicWithStacks[] = []

  const kanjis = await kanjiFactory()

  await Promise.all(
    topicFactory.map(async topic => {
      const newTopic = await prisma.topic.create({
        data: {
          name: topic,
          description: faker.lorem.sentence(),
          stacks: {
            create: Array.from(Array(10)).map(() => ({
              name: fakerJA.person.fullName(),
              description: faker.lorem.sentence(),
              thumbnail: faker.image.url(),
              kanjis: {
                create: kanjis.map(each => ({
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
                      yomikata: each.romanji,
                      meaning: faker.word.words({ count: { min: 3, max: 8 } }),
                      examples: {
                        create: {
                          example: faker.word.words({ count: { min: 3, max: 8 } }),
                          meaning: faker.word.words({ count: { min: 3, max: 8 } })
                        }
                      }
                    }
                  }
                }))
              }
            }))
          }
        },
        include: {
          stacks: true
        }
      })
      topicList.push(newTopic)
    })
  )

  return topicList
}

export default topicSeeder
