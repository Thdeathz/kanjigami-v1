import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const getAllGames = async () => {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      thumbnail: true
    }
  })

  if (!games || games.length === 0) {
    throw new HttpError(500, 'No games found')
  }

  return games
}

export default {
  getAllGames
}
