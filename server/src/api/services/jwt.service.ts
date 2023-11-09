import { type Response } from 'express'
import jwt from 'jsonwebtoken'

import { AccessTokenPayload, RefreshTokenPayload } from '../@types/auth'
import redisClient from '../databases/init.redis'
import HttpError from '../helpers/httpError'

const signNewRefreshToken = async (payload: AccessTokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: payload.UserInfo.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: '7d'
      },
      async (err, token) => {
        if (err || !token) return reject(new HttpError(500, 'Internal Server Error'))

        // save refresh token to redis
        const result = await redisClient.set(
          `rft_${payload.UserInfo.id}`,
          JSON.stringify({
            refreshToken: token,
            userData: payload.UserInfo
          }),
          'EX',
          60 * 60 * 24 * 7 // 7 days
        )
        if (result !== 'OK') throw new HttpError(500, 'Internal Server Error')

        resolve(token)
      }
    )
  })
}

const signNewAccessToken = (payload: AccessTokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        UserInfo: {
          ...payload.UserInfo
        }
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '5m' },
      (err, token) => {
        if (err || !token) return reject(new HttpError(500, 'Internal Server Error'))

        resolve(token)
      }
    )
  })
}

const decodeRefreshToken = async (
  refreshToken: string
): Promise<RefreshTokenPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err, decoded) => {
      if (err) return reject(err)

      const userData = decoded as RefreshTokenPayload | undefined

      resolve(userData)
    })
  })
}

const decodeAccessToken = async (accessToken: string): Promise<AccessTokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, async (err, decoded) => {
      const userData = decoded as AccessTokenPayload | undefined
      if (err || !userData || !userData.UserInfo)
        return reject(new HttpError(401, 'Unauthorized/InvalidAccessToken'))

      resolve(userData)
    })
  })
}

const clearRefreshToken = (refreshToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await decodeRefreshToken(refreshToken)
      if (userData) await redisClient.del(`rft_${userData.id}`)
      resolve(null)
    } catch (error) {
      console.log(error)
      reject(new HttpError(500, 'Internal Server Error'))
    }
  })
}

const sendResWithTokens = async (userData: AccessTokenPayload, cookies: any, res: Response) => {
  // remove unuse refresh token
  if (cookies.jwt && cookies.jwt !== 'undefined') {
    const oldRefreshToken = cookies.jwt
    await clearRefreshToken(oldRefreshToken)

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })
  }

  // gen new token
  const accessToken: string = await signNewAccessToken(userData)
  const refreshToken: string = await signNewRefreshToken(userData)

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7 // match to refresh token expiration
  })

  res.json({ accessToken })
}

export default {
  signNewRefreshToken,
  signNewAccessToken,
  decodeRefreshToken,
  decodeAccessToken,
  clearRefreshToken,
  sendResWithTokens
}
