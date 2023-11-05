import { type RequestHandler } from 'express'

import { RegisterRequest } from '~/api/@types/user'
import userService from '~/api/services/user.service'
import { sendResWithTokens } from '~/api/helpers/jwtToken'

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await userService.getAllUsers()

  if (!users?.length) return res.status(400).json({ message: 'No users found' })

  res.json({ message: 'Get all users successfully', data: users })
}

/**
 * @desc Create new user (register)
 * @route POST /users
 * @access Public
 */
export const createNewUser: RequestHandler = async (req, res) => {
  const { email, password, roles } = <RegisterRequest>req.body

  // Check if user already existed
  const userExisted = await userService.getUserByEmail(email)
  if (userExisted) return res.status(409).json({ message: 'User already existed' })

  // Create new user
  const user = await userService.createUser({
    email,
    password,
    roles
  })
  if (user) {
    await sendResWithTokens(user, req.cookies, res)
  } else res.status(400).json({ message: 'Invaild user data received' })
}
