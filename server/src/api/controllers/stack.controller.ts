import { RequestHandler } from 'express'
import { CreateStackReq, FullCreateStackReq } from '../@types/stack'
import stackService from '../services/stack.service'
import HttpError from '../helpers/httpError'

/**
 * @desc Create a new stack
 * @route POST /api/stacks
 * @access Private
 */
export const createStack: RequestHandler = async (req, res) => {
  const { name, description, topic, gameStacks, kanjis } = <FullCreateStackReq>req.body

  const newStack = await stackService.createStack({ name, description, topic, gameStacks, kanjis })

  res.status(201).json(newStack)
}

export const getAllStack: RequestHandler = async (req: any, res: any) => {
  const stacks = await stackService.getAllStacks()
  return res.status(200).json({ message: 'Get all kanji stack successfully', data: stacks })
}

export const getFollowedStacks: RequestHandler = async (req: any, res: any) => {
  const currentUser = req?.currentUser
  const userId = currentUser.id
  const followedStacks = await stackService.getFollowedStacks(userId)
  return res
    .status(200)
    .json({ message: 'get all followed stacks succesfully', data: followedStacks })
}

export const followStack = async (req: any, res: any) => {
  const currentUser = req?.currentUser
  const userId = currentUser.id
  const { stackId } = req?.query
  try {
    const setFollowStack = await stackService.setFollowStack(userId, stackId)
    return res.status(201).json(setFollowStack)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
