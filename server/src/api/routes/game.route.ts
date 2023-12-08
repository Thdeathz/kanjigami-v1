import express from 'express'

import { getAllGames, getFlipCardGameContent } from '../controllers/game.controller'

const router = express.Router()

router.route('/').get(getAllGames)

router.route('/flip-card/:stackId').get(getFlipCardGameContent)

export default router
