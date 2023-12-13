import type { Socket } from 'socket.io'

import redisClient from '~/api/databases/init.redis'
import { GetGameContentRequest, UserSubmitAnswerRequest } from '../@types/game'
import { GameData, MultipleChoiceContent } from '~/api/@types/game'
import gameLogService from '~/api/services/game-log.service'

const handleGetContent = async (socket: Socket, { sessionId, userId }: GetGameContentRequest) => {
  const gameData = await redisClient.get(`g_${sessionId}`)
  const time = await redisClient.ttl(`g_${sessionId}`)

  if (!gameData || userId !== JSON.parse(gameData).userId) {
    socket.emit('game:content-not-found')
    return
  }

  const data = JSON.parse(gameData) as GameData<MultipleChoiceContent>

  const questions = data.gameContent.map(each => ({
    question: {
      ...each.question,
      id: 'question'
    },
    options: each.options.map(option => ({
      id: 'option',
      option: option.kunyomi
    }))
  }))

  socket.emit('game:multiple-choice-content', {
    gameContent: questions,
    time
  })
}

const handleSaveScore = async (
  socket: Socket,
  { sessionId, userId, gameContent }: UserSubmitAnswerRequest
) => {
  const gameData = await redisClient.get(`g_${sessionId}`)
  const time = await redisClient.ttl(`g_${sessionId}`)
  await redisClient.del(`g_${sessionId}`)

  if (!gameData || userId !== JSON.parse(gameData).userId) {
    socket.emit('game:content-not-found')
    return
  }

  const data = JSON.parse(gameData) as GameData<MultipleChoiceContent>

  // calculate score
  let finalScore =
    gameContent.reduce((acc, each, index) => {
      const question = data.gameContent[index]
      if (question.answer.id === question.options[each.selectedAnswer]?.id) {
        return acc + 1
      }

      return acc
    }, 0) * 16

  if (time > 0) finalScore -= (60 * 5 - time) * 0.2

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
