import express from 'express'

import { createGameLog, getAllGameLog, updateGameLog } from '../controllers/gamelog.controller'
import verifyJWT from '../middleware/verifyJWT'
import validateRequest from '../middleware/validateRequest'
import { UpdateCreateGameSchema } from '../validations/gamelog.validation'

const router = express.Router()

router
  .route('/')
  .get(getAllGameLog)
  .post(verifyJWT, validateRequest(UpdateCreateGameSchema), createGameLog)
  .put(verifyJWT, validateRequest(UpdateCreateGameSchema), updateGameLog)

export default router
