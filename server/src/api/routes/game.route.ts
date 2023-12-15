import express from 'express'

import verifyJWT from '../middleware/verifyJWT'
import validateRequest from '../middleware/validateRequest'
import getCurrentUser from '../middleware/getCurrentUser'
import {
  getAllGames,
  getAllStackGames,
  getGameById,
  startGame
} from '../controllers/game.controller'
import { startGameRequestSchema } from '../validations/game.validation'

const router = express.Router()

router.route('/').get(getAllGames)

router.route('/stack/:stackId').get(getCurrentUser, getAllStackGames)

router.route('/:id').get(getGameById)

router
  .route('/:gameId/:stackId')
  .post(verifyJWT, validateRequest(startGameRequestSchema), startGame)

export default router
