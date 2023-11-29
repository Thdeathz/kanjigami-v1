import { PrismaClient } from '@prisma/client'

import accountSeeder from './account.seeder'
import gameSeeder from './game.seeder'
import topicSeeder from './topic.seeder'
import stackSeeder from './stack.seeder'
import eventSeeder from './event.seeder'

const prisma = new PrismaClient()

async function seed() {
  const accounts = await accountSeeder()

  const games = await gameSeeder()

  const topics = await topicSeeder()

  const stacks = await stackSeeder(topics)

  await eventSeeder(games, accounts, stacks)
}

seed()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
