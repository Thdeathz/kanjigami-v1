import type { RequestHandler } from 'express'
import kanjiService from '../services/kanji.service'

export const getKanjiDetail: RequestHandler = async (req, res) => {
  const { id: kanjiId } = req.params

  const kanji = await kanjiService.getKanjiDetail(kanjiId)
  return res.json({
    message: 'Get kanji detail successfully',
    data: kanji
  })
}
