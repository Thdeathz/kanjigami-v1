import { type RequestHandler } from 'express'

import { CreateUpdateGameLogReq } from '../@types/game-log'
import gameLogService from '../services/game-log.service'

/**
 * @desc Create a game log
 * @route POST /api/game-log
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
 * @route PUT /api/game-log
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

/**
 * @desc Get game log detail
 * @route GET /api/game-log/:gameStackId
 * @access Private
 */
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

/**
 * @desc Get all time leaderboards
 * @route GET /api/game-log/leaderboards
 * @access Public
 */
export const getAllTimeLeaderboards: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 13

  const { topUsers, totals } = await gameLogService.getAllTimeLeaderboards(page, offset)

  res.status(200).json({
    message: 'Get all time leaderboards successfully',
    data: topUsers,
    currentPage: page,
    totalPages: Math.ceil(totals / offset)
  })
}
