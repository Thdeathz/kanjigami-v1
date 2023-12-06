import { RequestHandler } from 'express'

import { FullCreateStackReq } from '../@types/stack'
import stackService from '../services/stack.service'

/**
 * @desc Create a new stack
 * @route POST /stacks
 * @access Private
 */
export const createStack: RequestHandler = async (req, res) => {
  const { name, description, topic, gameStacks, kanjis } = <FullCreateStackReq>req.body

  const newStack = await stackService.createStack({ name, description, topic, gameStacks, kanjis })

  res.status(201).json(newStack)
}

/**
 * @desc Get all stacks
 * @route GET /stacks
 * @access Public
 */
export const getAllStacks: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const { stacks, total } = await stackService.getAllStacks(page, 20)

  return res.status(200).json({
    message: 'Get all kanji stack successfully',
    data: stacks,
    currentPage: page,
    totalPages: Math.ceil(total / 20)
  })
}

/**
 * @desc Get stack by id
 * @route GET /stacks/:id
 * @access Public
 */
export const getStackById: RequestHandler = async (req, res) => {
  const { id } = req.params

  const stack = await stackService.getStackById(id)

  return res.status(200).json({
    message: 'Get stack successfully',
    data: stack
  })
}

/**
 * @desc Get all followed stacks
 * @route GET /stacks/follow
 * @access Private
 */
export const getFollowedStacks: RequestHandler = async (req, res) => {
  const currentUser = (req as any).currentUser
  const userId = currentUser.id
  const followedStacks = await stackService.getFollowedStacks(userId)

  return res
    .status(200)
    .json({ message: 'Get all followed stacks succesfully', data: followedStacks })
}

/**
 * @desc Follow a stack
 * @route POST /stacks/follow/:id
 * @access Private
 */
export const followStack: RequestHandler = async (req, res) => {
  const currentUser = (req as any).currentUser
  const userId = currentUser.id
  const { id: stackId } = req.params

  if (!stackId) return res.status(400).json({ message: 'Stack not found' })

  const setFollowStack = await stackService.setFollowStack(userId, stackId)
  return res.status(201).json(setFollowStack)
}

/**
 * @desc Search stack by name admin
 * @route GET /stacks/admin/search
 * @access Private
 */
export const searchByName: RequestHandler = async (req, res) => {
  const searchValue = <string>req.query.name

  const stacks = await stackService.searchByName(searchValue)

  return res.status(200).json({
    message: 'Found stacks',
    data: stacks
  })
}

/**
 * @desc Get all stacks admin
 * @route GET /stacks/admin
 * @access Private
 */
export const adminGetAllStacks: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const { stacks, total } = await stackService.adminGetAllStacks(page, 10)

  return res.status(200).json({
    message: 'Get all kanji stack successfully',
    data: stacks,
    currentPage: page,
    totalPages: Math.ceil(total / 10)
  })
}
