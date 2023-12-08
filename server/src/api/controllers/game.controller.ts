import type { RequestHandler } from 'express'

import gameService from '../services/game.service'
import kanjiService from '../services/kanji.service'

/**
 * @desc Get all games
 * @route GET /games
 * @access Public
 */
export const getAllGames: RequestHandler = async (req, res) => {
  const games = await gameService.getAllGames()

  res.json({ message: 'Get all games successfully', data: games })
}

/**
 * @desc Get Flip Card Game Content
 * @route GET /games/flip-card/:stackId
 * @access Public
 */
export const getFlipCardGameContent: RequestHandler = async (req, res) => {
  const { stackId } = req.params

  const kanjis = await kanjiService.getFlipCardGameContent(stackId, 12)

  res.json({ message: 'Get flip card game content successfully', data: kanjis })
}
