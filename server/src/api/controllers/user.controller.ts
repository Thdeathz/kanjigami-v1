import { type RequestHandler } from 'express'

import { RegisterRequest } from '~/api/@types/user'
import userService from '~/api/services/user.service'
import jwtService from '~/api/services/jwt.service'

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
  const { email, password, username, roles } = <RegisterRequest>req.body

  // Check if user already existed
  await userService.checkUserExisted(email, username)

  // Create new user
  const account = await userService.createUser({
    email,
    username,
    password,
    roles
  })
  if (!account) return res.status(400).json({ message: 'Invaild user data received' })

  return await jwtService.sendResWithTokens(
    {
      UserInfo: {
        id: account.userId,
        username: account.user.username,
        email: account.email,
        roles: account.user.roles
      }
    },
    req.cookies,
    res
  )
}
