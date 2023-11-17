import { type RequestHandler } from 'express'

import gamelogService from '../services/gamelog.service'
import { CreateUpdateGameLogReq } from '../@types/gamelog'

/**
 * @desc Get all game logs
 * @route GET /api/gamelogs
 * @access Public
 */
export const getAllGameLog: RequestHandler = async (req, res) => {
  const gameLog = await gamelogService.getAllGameLog()

  res.status(200).json({
    message: 'Get all game logs successfully',
    data: gameLog
  })
}

/**
 * @desc Create a game log
 * @route POST /api/gamelogs
 * @access Private
 */
export const createGameLog: RequestHandler = async (req, res) => {
  const currentUser = (req as any).currentUser
  const userId = currentUser.id
  const data = <CreateUpdateGameLogReq>req.body

  const gameLog = await gamelogService.createGameLog(userId, data)

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

  const gameLog = await gamelogService.updateGameLog(userId, data)

  res.status(200).json({
    message: 'Update game log successfully',
    data: gameLog
  })
}
