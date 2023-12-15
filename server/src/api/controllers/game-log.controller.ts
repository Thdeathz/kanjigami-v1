import { type RequestHandler } from 'express'

import { CreateUpdateGameLogReq } from '../@types/game-log'
import gameLogService from '../services/game-log.service'

/**
 * @desc Create a game log
 * @route POST /api/gamelogs
 * @access Private
 */
export const createGameLog: RequestHandler = async (req, res) => {
  const currentUser = (req as any).currentUser
  const userId = currentUser.id
  const data = <CreateUpdateGameLogReq>req.body

  const gameLog = await gameLogService.createGameLog(userId, data)

  res.status(200).json({
    message: 'Create game log successfully',
    data: gameLog
  })
}

/**
 * @desc Update a game log
 * @route PUT /api/gamelogs
 * @access Private
 */
export const updateGameLog: RequestHandler = async (req, res) => {
  const currentUser = (req as any).currentUser
  const userId = currentUser.id
  const data = <CreateUpdateGameLogReq>req.body

  const gameLog = await gameLogService.updateGameLog(userId, data)

  res.status(200).json({
    message: 'Update game log successfully',
    data: gameLog
  })
}

export const getGameLogDetail: RequestHandler = async (req, res) => {
  const { gameStackId } = req.params
  const currentUser = (req as any).currentUser
  const userId = currentUser.id

  const gameLog = await gameLogService.getGameLogDetail(userId, gameStackId)

  res.status(200).json({
    message: 'Get game log detail successfully',
    data: gameLog
  })
}
