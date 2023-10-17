import { User } from '@prisma/client'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '~/config/dbConnect'

/**
 * @desc Sign new refresh token
 * @param userData
 * @access Private
 */
export const signNewRefreshToken = (userData: User): string => {
  return jwt.sign({ id: userData.id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d'
  })
}

/**
 * @desc Sign new access token
 * @param userData
 * @access Private
 */
export const signNewAccessToken = (userData: User): string => {
  return jwt.sign(
    {
      UserInfo: {
        id: userData.id,
        email: userData.email,
        roles: userData.roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' }
  )
}

/**
 * @desc Send response with new access and refresh token
 * @param userData
 * @param cookies
 * @param res
 * @access Private
 */
export const sendResWithTokens = async (userData: User, cookies: any, res: Response) => {
  // gen new token
  const accessToken: string = signNewAccessToken(userData)

  const refreshToken: string = signNewRefreshToken(userData)

  // remove unuse refresh token
  if (cookies?.jwt) {
    const oldRefreshToken = cookies.jwt
    // const user = await User.findOne({ refreshToken: oldRefreshToken }).exec()
    const user = await prisma.user.findFirst({
      where: {
        refreshToken: oldRefreshToken
      }
    })

    if (user) await prisma.user.update({ where: { id: user.id }, data: { refreshToken: '' } })

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })
  }

  // saving refresh token with current user
  await prisma.user.update({ where: { id: userData.id }, data: { refreshToken } })

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7 // match to refresh token expiration
  })

  res.json({ accessToken })
}
