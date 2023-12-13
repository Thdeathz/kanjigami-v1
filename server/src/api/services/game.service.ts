import { v4 } from 'uuid'

import prisma from '../databases/init.prisma'
import redisClient from '../databases/init.redis'
import HttpError from '../helpers/httpError'
import kanjiService from './kanji.service'

const getAllGames = async () => {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      thumbnail: true
    }
  })

  if (!games || games.length === 0) throw new HttpError(500, 'No games found')

  return games
}

const getAllStackGames = async (stackId: string, userId?: string) => {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      thumbnail: true,
      gameStacks: {
        where: {
          stackId,
          gameLogs: {
            some: {
              userId
            }
          }
        },
        select: {
          gameLogs: {
            where: {
              userId: userId ?? ''
            },
            select: {
              archievedPoints: true
            }
          }
        }
      }
    }
  })

  if (!games || games.length === 0) throw new HttpError(500, 'No games found')

  // Normalize game data
  const result = games.map(game => {
    const score = game.gameStacks[0]?.gameLogs[0]?.archievedPoints

    const { gameStacks, ...removedGameStacks } = game

    return {
      ...removedGameStacks,
      currentUserScore: score ?? 0
    }
  })

  return result
}

const startGame = async (
  gameId: string,
  stackId: string,
  userId: string,
  numberKanji: number,
  time: number
) => {
  const gameContent = await kanjiService.getGameContent(gameId, stackId, numberKanji)

  const sessionId = v4()

  redisClient.set(
    `g_${sessionId}`,
    JSON.stringify({
      gameId,
      userId,
      stackId,
      score: 0,
      gameContent
    }),
    'EX',
    Number(time) // 5 minutes
  )

  return sessionId
}

const getGameById = async (gameId: string) => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    },
    select: {
      id: true,
      name: true
    }
  })

  if (!game) throw new HttpError(404, 'Game not found')
  return game
}

export default {
  getAllGames,
  getAllStackGames,
  startGame,
  getGameById
}
