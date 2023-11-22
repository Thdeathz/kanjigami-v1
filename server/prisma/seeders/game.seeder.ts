import { Game, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const gameFactory = ['Blind Flip Card', 'Kanji Shooter', 'Typing Racing']

const gameSeeder = async (): Promise<Game[]> => {
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

  return games
}

export default gameSeeder
