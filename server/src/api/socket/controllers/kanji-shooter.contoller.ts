import type { Socket } from 'socket.io'

import { GetGameContentRequest } from '../@types/game'
import { GameData, KanjiShooterContent } from '~/api/@types/game'

import redisClient from '~/api/databases/init.redis'
import gameLogService from '~/api/services/game-log.service'
import { shuffleArray } from '~/api/helpers/array.helper'

const handleGetContent = async (socket: Socket, { sessionId, userId }: GetGameContentRequest) => {
  const gameData = await redisClient.get(`g_${sessionId}`)

  if (!gameData || userId !== JSON.parse(gameData).userId) {
    socket.emit('game:content-not-found')
    return
  }

  const data = JSON.parse(gameData) as GameData<KanjiShooterContent>

  const kanjis = shuffleArray(data.gameContent)

  socket.emit('game:kanji-shooter-game-content', {
    kanjis: kanjis
  })
}

const handleSaveScore = async (
  socket: Socket,
  { sessionId, userId, score }: GetGameContentRequest & { score: number }
) => {
  const gameData = await redisClient.get(`g_${sessionId}`)
  const gameTime = await redisClient.ttl(`g_${sessionId}`)
  await redisClient.del(`g_${sessionId}`)

  if (!gameData || userId !== JSON.parse(gameData).userId) {
    socket.emit('game:content-not-found')
    return
  }

  let finalScore = score
  if (gameTime > 0) finalScore -= (60 * 30 - gameTime) * 0.2

  const data = JSON.parse(gameData) as GameData<KanjiShooterContent>

  const result = await gameLogService.saveUserScore(userId, {
    gameId: data.gameId,
    stackId: data.stackId,
    score: finalScore
  })

  socket.emit('game:calculate-score-success', { logId: result.gameStackId })
}

export default {
  handleGetContent,
  handleSaveScore
}
