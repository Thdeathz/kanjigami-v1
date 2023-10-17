import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'

import { UserData, UserObject } from '~/@types'
import { sendResWithTokens } from '~/utils/jwtToken'
import prisma from '~/config/dbConnect'

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
export const getAllUsers: RequestHandler = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      roles: true
    }
  })

  if (!users?.length) {
    res.status(400).json({ message: 'No users found' })
    return
  }

  res.json({ message: 'Get all users successfully', data: users })
})

/**
 * @desc Create new user
 * @route POST /users
 * @access Public
 */
export const createNewUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password, roles } = <UserData>req.body

  // Confirm data
  if (!email || !password) {
    res.status(400).json({ message: 'Please provide all required fields' })
    return
  }

  // Check if user already existed
  const userExisted = await prisma.user.findUnique({ where: { email } })
  if (userExisted) {
    res.status(409).json({ message: 'User already existed' })
    return
  }

  // Hash password
  const hashedPassword: string = await bcrypt.hash(<string>password, 10)
  const userObject: UserObject =
    !Array.isArray(roles) || !roles.length
      ? { email, password: hashedPassword }
      : { email, password: hashedPassword, roles }

  // Create new user
  const user = await prisma.user.create({
    data: userObject
  })
  if (user) {
    await sendResWithTokens(user, req.cookies, res)
  } else res.status(400).json({ message: 'Invaild user data received' })
})
