import express from 'express'

import {
  createGameLog,
  getAllTimeLeaderboards,
  getGameLogDetail,
  updateGameLog
} from '../controllers/game-log.controller'
import verifyJWT from '../middleware/verifyJWT'
import validateRequest from '../middleware/validateRequest'
import { UpdateCreateGameSchema } from '../validations/game-log.validation'

const router = express.Router()

router
  .route('/')
  .post(verifyJWT, validateRequest(UpdateCreateGameSchema), createGameLog)
  .put(verifyJWT, validateRequest(UpdateCreateGameSchema), updateGameLog)

router.route('/leaderboards').get(getAllTimeLeaderboards)

router.route('/:gameStackId').get(verifyJWT, getGameLogDetail)

export default router
