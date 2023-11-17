import { RequestHandler } from 'express'
import { CreateStackReq } from '../@types/stack'
import stackService from '../services/stack.service'

/**
 * @desc Create a new stack
 * @route POST /api/stacks
 * @access Private
 */
export const createStack: RequestHandler = async (req, res) => {
  const { name, description, topic, gameStacks } = <CreateStackReq>req.body

  const newStack = await stackService.createStack({ name, description, topic, gameStacks })

  res.status(201).json(newStack)
}
