import express from 'express'

import { deleteRound, updateRound } from '../controllers/round.controller'

const router = express.Router()

router.route('/:id').put(updateRound).delete(deleteRound)

export default router
