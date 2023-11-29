import { Game } from '@prisma/client'

import prisma from './prismaClient'

const gameFactory = ['Blind Flip Card', 'Kanji Shooter', 'Typing Racing']

const gameSeeder = async (): Promise<Game[]> => {
  console.log('🌱 Seeding games...')
  let games: Game[] = []
  await Promise.all(
    gameFactory.map(async gameType => {
      const newGame = await prisma.game.create({
        data: {
          name: gameType
        }
      })
      games.push(newGame)
    })
  )

  console.log('🌱 Seeding games completed!')

  return games
}

export default gameSeeder
