import { PrismaClient } from '@prisma/client'
import gameSeeder from './game.seeder'
import topicSeeder from './topic.seeder'
import eventSeeder from './event.seeder'
import accountSeeder from './account.seeder'

const prisma = new PrismaClient()

async function seed() {
  const accounts = await accountSeeder()

  const games = await gameSeeder()

  const topics = await topicSeeder()

  await eventSeeder(games, topics, accounts)
}

seed()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
