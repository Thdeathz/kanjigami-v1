import { type RequestHandler } from 'express'

import { LoginRequest } from '../@types/auth'
import { sendResWithTokens } from '~/api/helpers/jwtToken'
import authService from '../services/auth.service'
import userService from '../services/user.service'

/**
 * @desc Login
 * @route POST /auth
 * @access Public
 */
export const login: RequestHandler = async (req, res) => {
  const cookies = req.cookies
  const { email, password } = <LoginRequest>req.body

  const user = await authService.authenticateUser(email, password)
  await sendResWithTokens(user, cookies, res)
}

/**
 * @desc Login with Google
 * @route POST /auth/google
 * @access Public
 */
export const loginWithGoogle: RequestHandler = async (req, res) => {
  const cookies = req.cookies
  const googleIdToken = req.body.googleIdToken

  const { uid, email } = await authService.validateGoogleIdToken(googleIdToken)

  const user = await authService.findOrCreateUser(uid, email)
  await sendResWithTokens(user, cookies, res)
}

/**
 * @desc Refresh
 * @route POST /auth/refresh
 * @access Public
 */
export const refresh: RequestHandler = async (req, res) => {
  const cookie = req.cookies
  if (!cookie.jwt) return res.status(401).json({ message: 'Unauthorized' })

  // clear current refresh token
  const refreshToken: string = cookie.jwt
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  const decodedToken = await authService.verifyRefreshToken(refreshToken)
  const user = await userService.getUserByRefreshToken(refreshToken)

  // detected refresh token reuse
  if (!user || !user.active) {
    // clear hacked user's refresh token
    const hackedUser = await userService.getUserById(decodedToken.id)
    if (hackedUser) {
      await userService.updateUserRefreshToken(hackedUser.email, '')
    }

    return res.status(401).json({ message: 'Unauthorized' })
  }

  // gen new access and refresh token for this user
  if (user.id !== decodedToken.id) {
    await userService.updateUserRefreshToken(user.email, '')
    return res.status(403).json({ message: 'Forbidden' })
  }

  await sendResWithTokens(user, cookie, res)
}

/**
 * @desc Logout
 * @route POST /auth/logout
 * @access Public
 */
export const logout: RequestHandler = async (req, res) => {
  const cookie = req.cookies
  if (!cookie.jwt) return res.status(204)

  // clear jwt cookie
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })

  // clear refresh token in database
  await authService.clearUserRefreshToken(cookie.jwt)

  res.json({ message: 'Logged out. Cookie cleared ><!' })
}
