import { faker } from '@faker-js/faker'

type Account = {
  email: string
  password: string
  username: string
  avatarUrl: string
  rankingScore: number
}

export const accountFactory = async () => {
  let accounts: Account[] = []

  Array.from(Array(50)).map(async () => {
    const email = faker.internet.email()
    const password = '$2b$10$S1DyrPjcRntNMjTdhAyeXu5zfp9EB0xyvLOvy90/LQTmTd75zdfqa'
    const username = faker.internet.userName()
    const avatarUrl = faker.image.avatar()
    const rankingScore = faker.number.int({ min: 0, max: 1000 })

    accounts.push({
      email,
      password,
      username,
      avatarUrl,
      rankingScore
    })
  })

  return accounts
}
