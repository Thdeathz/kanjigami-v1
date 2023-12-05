import { Game } from '@prisma/client'

import prisma from './prismaClient'

// const gameFactory = ['Blind Flip Card', 'Kanji Shooter', 'Typing Racing']
const gameFactory = [
  {
    name: 'Multiple Choice',
    thumbnail:
      'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/multiple-choice.png'
  },
  {
    name: 'Kanji Shooter',
    thumbnail:
      'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/kanji-shooter.png'
  },
  {
    name: 'Typing Racing',
    thumbnail:
      'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/typing-racing.png'
  },
  {
    name: 'Blind Flip Card',
    thumbnail:
      'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/flip-blind-card.png'
  }
]

const gameSeeder = async (): Promise<Game[]> => {
  console.log('🌱 Seeding games...')
  let games: Game[] = []
  await Promise.all(
    gameFactory.map(async game => {
      const newGame = await prisma.game.create({
        data: {
          name: game.name,
          thumbnail: game.thumbnail
        }
      })
      games.push(newGame)
    })
  )

  console.log('🌱 Seeding games completed!')

  return games
}

export default gameSeeder
