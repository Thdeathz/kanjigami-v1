import express from 'express'

import { getAllGames } from '../controllers/game.controller'

const route = express.Router()

route.route('/').get(getAllGames)

export default route
