import { type RequestHandler } from 'express'

import { RegisterRequest } from '~/api/@types/user'
import userService from '~/api/services/user.service'
import jwtService from '~/api/services/jwt.service'
import firebaseService from '../services/firebase.service'

/**
 * @desc Get all users
 * @route GET /user
 * @access Private
 */
export const getAllUsers: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const { users, total } = await userService.getAllUsers(page, 10)

  res.json({
    message: 'Get all users successfully',
    data: users,
    currentPage: page,
    totalPages: Math.ceil(total / 10)
  })
}

/**
 * @desc Create new user (register)
 * @route POST /user
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

/**
 * @desc Update user avatar
 * @route PUT /user/:id/avatar
 * @access Private
 */
export const updateAvatar: RequestHandler = async (req, res) => {
  const { id: userId } = req.params
  const avatar = req.file?.buffer
  const extention = req.file?.originalname.split('.')[1]

  if (!avatar || !extention)
    return res.status(400).json({ message: 'Invalid avatar data received' })

  const avatarUrl = await firebaseService.storeFile(avatar, 'images', extention)

  const updatedUser = await userService.updateAvatar(userId, avatarUrl)
  if (!updatedUser || !updatedUser.account)
    return res.status(400).json({ message: 'Invalid user data received' })

  return await jwtService.sendResWithTokens(
    {
      UserInfo: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.account.email,
        roles: updatedUser.roles,
        avatarUrl: updatedUser.avatarUrl ?? ''
      }
    },
    req.cookies,
    res
  )
}

/**
 * @desc Upload image to firebase storage
 * @route POST /user/upload
 * @access Private
 */
export const uploadFile: RequestHandler = async (req, res) => {
  const { locate } = req.body
  const file = req.file?.buffer
  const extention = req.file?.originalname.split('.')[1]

  if (!file || !extention || !locate)
    return res.status(400).json({ message: 'Invalid file data received' })

  const fileUrl = await firebaseService.storeFile(file, locate, extention)

  return res.json({ message: 'Upload file successfully', data: fileUrl })
}
