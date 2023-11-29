import { faker, fakerJA } from '@faker-js/faker'

type TopicFactory = {
  name: string
  description: string
}

export const topicFactory = async () => {
  let topics: TopicFactory[] = []

  Array.from(Array(10)).map(async () => {
    const name = fakerJA.person.firstName()
    const description = faker.lorem.sentence()

    topics.push({
      name,
      description
    })
  })

  return topics
}
