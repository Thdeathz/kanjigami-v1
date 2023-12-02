import type { RequestHandler } from 'express'

import gameService from '../services/game.service'

/**
 * @desc Get all games
 * @route GET /games
 * @access Public
 */
export const getAllGames: RequestHandler = async (req, res) => {
  const games = await gameService.getAllGames()

  res.json({ message: 'Get all games successfully', data: games })
}
