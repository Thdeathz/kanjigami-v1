import { Topic } from '@prisma/client'
import { faker, fakerJA } from '@faker-js/faker'

import { KanjiFactory, kanjiFactory } from './kanji.factory'

type StackFactory = {
  name: string
  description: string
  thumbnail: string
  topic: Topic
  kanjis: KanjiFactory[]
}

export const stackFactory = async (topics: Topic[]) => {
  let stacks: StackFactory[] = []

  await Promise.all(
    Array.from(Array(60)).map(async () => {
      const name = fakerJA.person.firstName()
      const description = faker.lorem.sentences()
      const thumbnail = faker.image.url()
      const topic = faker.helpers.arrayElement(topics)
      const kanjis = await kanjiFactory(120)

      stacks.push({
        name,
        description,
        thumbnail,
        topic,
        kanjis
      })
    })
  )

  return stacks
}
