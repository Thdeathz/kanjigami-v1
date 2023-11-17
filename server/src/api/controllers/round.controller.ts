import { UUID } from 'crypto'
import { type RequestHandler } from 'express'

import { UpdateRoundReq } from '../@types/round'
import roundService from '../services/round.service'

/**
 * @desc Update round
 * @route PUT /rounds/:id
 * @access Private
 */
export const updateRound: RequestHandler = async (req, res) => {
  const id = <UUID>req.params.id
  const { gameId, stackId } = <UpdateRoundReq>req.body

  const round = await roundService.updateRound(id, { gameId, stackId })

  res.json({ message: 'Update round successfully', data: round })
}

/**
 * @desc Delete round by id
 * @route DELETE /rounds/:id
 * @access Private
 */
export const deleteRound: RequestHandler = async (req, res) => {
  const id = <UUID>req.params.id

  const round = await roundService.deleteRound(id)

  res.json({ message: 'Delete round successfully', data: round })
}
