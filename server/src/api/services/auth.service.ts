import bcrypt from 'bcrypt'
import { getAuth } from 'firebase-admin/auth'
import jwt from 'jsonwebtoken'

import HttpError from '../helpers/httpError'
import userService from './user.service'
import { RefreshTokenPayload } from '../@types/auth'

const authenticateUser = async (email: string, password: string) => {
  const foundUser = await userService.getUserByEmail(email)
  if (!foundUser || !foundUser.active) throw new HttpError('Unauthorized/InvalidEmail', 401)

  const match: boolean = await bcrypt.compare(password, foundUser.password)
  if (!match) throw new HttpError('Unauthorized/InvalidPassword', 401)

  return foundUser
}

const validateGoogleIdToken = async (googleIdToken: string) => {
  const decodedToken = await getAuth().verifyIdToken(googleIdToken)
  if (!decodedToken || !decodedToken.uid || !decodedToken.email) {
    throw new HttpError('Unauthorized/InvalidGoogleToken', 401)
  }

  return { uid: decodedToken.uid, email: decodedToken.email }
}

const findOrCreateUser = async (uid: string, email: string) => {
  let foundUser = await userService.getUserByEmail(email)
  // if not existed create new user
  if (!foundUser) foundUser = await userService.createUserWithGoogle(uid, email)

  return foundUser
}

const verifyRefreshToken = async (refreshToken: string): Promise<RefreshTokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, decoded) => {
      if (err) return reject(err)

      const userData = decoded as RefreshTokenPayload | undefined
      if (!userData) return reject(new HttpError('Unauthorized/InvalidRefreshToken', 403))

      resolve(userData)
    })
  })
}

const clearUserRefreshToken = async (refreshToken: string) => {
  const user = await userService.getUserByRefreshToken(refreshToken)
  if (user) await userService.updateUserRefreshToken(user.email, '')
}

export default {
  authenticateUser,
  validateGoogleIdToken,
  findOrCreateUser,
  clearUserRefreshToken,
  verifyRefreshToken
}
