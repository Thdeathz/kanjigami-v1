import express from 'express'
import { getKanjiDetail } from '../controllers/kanji.controller'

const router = express.Router()

router.route('/:id').get(getKanjiDetail)

export default router
