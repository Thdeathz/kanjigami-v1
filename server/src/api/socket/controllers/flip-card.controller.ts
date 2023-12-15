import type { Socket } from 'socket.io'

import {
  GetGameContentRequest,
  SaveGameScoreRequest,
  UpdateGameStatusRequest
} from '../@types/game'

import { GameData } from '~/api/@types/game'
import redisClient from '~/api/databases/init.redis'
import gameLogService from '~/api/services/game-log.service'
import { ImageContent, KanjiContent } from '~/api/@types/game'

const handleGetGameContent = async (
  socket: Socket,
  { sessionId, userId }: GetGameContentRequest
) => {
  const gameData = await redisClient.get(`g_${sessionId}`)
  const ttl = await redisClient.ttl(`g_${sessionId}`)

  if (!gameData || userId !== JSON.parse(gameData).userId) {
    socket.emit('game:content-not-found')
    return
  }

  const data = JSON.parse(gameData) as GameData<ImageContent | KanjiContent>

  socket.emit('game:blind-card-game-content', {
    gameContent: data.gameContent,
    time: ttl,
    score: data.score
  })
}

const handleCalculateScore = async (
  socket: Socket,
  { userId, sessionId, gameId, stackId, score }: SaveGameScoreRequest
) => {
  const gameTime = await redisClient.ttl(`g_${sessionId}`)
  await redisClient.del(`g_${sessionId}`)

  let finalScore = score * 16
  if (gameTime > 0) finalScore -= (60 * 5 - gameTime) * 0.2

  const data = await gameLogService.saveUserScore(userId, {
    gameId,
    stackId,
    score: finalScore
  })

  socket.emit('game:calculate-score-success', { logId: data.gameStackId })
}

const handleUpdateGameStatus = async (
  socket: Socket,
  { sessionId, kanjiId, userId }: UpdateGameStatusRequest
) => {
  const gameData = await redisClient.get(`g_${sessionId}`)

  if (!gameData) {
    socket.emit('game:content-not-found')
    return
  }

  const data = JSON.parse(gameData) as GameData<ImageContent | KanjiContent>

  let avaliableKanji = 0
  const newGameContent = data.gameContent.map(kanji => {
    if (kanji.id === kanjiId && kanji.isVisible) {
      return {
        ...kanji,
        isVisible: false
      }
    } else {
      if (kanji.isVisible) avaliableKanji++
    }

    return kanji
  })

  if (avaliableKanji === 0) {
    await handleCalculateScore(socket, {
      userId,
      sessionId,
      gameId: data.gameId,
      stackId: data.stackId,
      score: 12
    })

    return
  }

  await redisClient.set(
    `g_${sessionId}`,
    JSON.stringify({
      ...data,
      score: 12 - avaliableKanji / 2,
      gameContent: newGameContent
    }),
    'KEEPTTL'
  )
}

export default {
  handleGetGameContent,
  handleUpdateGameStatus,
  handleCalculateScore
}
