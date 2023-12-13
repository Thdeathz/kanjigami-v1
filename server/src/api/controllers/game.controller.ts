import type { RequestHandler } from 'express'

import gameService from '../services/game.service'
import kanjiService from '../services/kanji.service'
import HttpError from '../helpers/httpError'
import { StartGameRequest } from '../@types/game'

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
 * @desc Get all games in stack
 * @route GET /games
 * @access Public
 */
export const getAllStackGames: RequestHandler = async (req, res) => {
  const { stackId } = req.params
  const currentUser = (req as any).currentUser
  const games = await gameService.getAllStackGames(stackId, currentUser?.id)

  res.json({ message: 'Get all games successfully', data: games })
}

/**
 * @desc Get game by id
 * @route GET /games/:id
 * @access Public
 */
export const getGameById: RequestHandler = async (req, res) => {
  const { id: gameId } = req.params

  const game = await gameService.getGameById(gameId)

  res.json({ message: 'Get game by id successfully', data: game })
}

/**
 * @desc Start Game
 * @route POST /games/:gameId/:stackId
 * @access Private
 */
export const startGame: RequestHandler = async (req, res) => {
  const { gameId, stackId } = req.params
  const { numberKanji, time } = <StartGameRequest>req.body
  const currentUser = (req as any).currentUser

  const sessionId = await gameService.startGame(gameId, stackId, currentUser.id, numberKanji, time)

  res.json({ message: 'Start game successfully', data: sessionId })
}
