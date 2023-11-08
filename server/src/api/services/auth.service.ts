import bcrypt from 'bcrypt'
import { getAuth } from 'firebase-admin/auth'

import { AccessTokenPayload, CurrentUserData } from '../@types/auth'
import redisClient from '../databases/init.redis'
import HttpError from '../helpers/httpError'
import userService from './user.service'
import { RegisterByGoogle } from '../@types/user'
import jwtService from './jwt.service'

const authenticateUser = async (email: string, password: string) => {
  const foundUser = await userService.getUserByEmail(email)
  if (!foundUser || !foundUser.isActive) throw new HttpError(401, 'Unauthorized/InvalidEmail')

  const match: boolean = await bcrypt.compare(password, foundUser.password)
  if (!match) throw new HttpError(401, 'Unauthorized/InvalidPassword')

  return foundUser
}

const validateGoogleIdToken = async (googleIdToken: string) => {
  const decodedToken = await getAuth().verifyIdToken(googleIdToken)
  if (!decodedToken || !decodedToken.uid || !decodedToken.email) {
    throw new HttpError(401, 'Unauthorized/InvalidGoogleToken')
  }

  return {
    uid: decodedToken.uid,
    username: decodedToken.name,
    avatarUrl: decodedToken.picture,
    email: decodedToken.email
  }
}

const findOrCreateAccount = async (userData: RegisterByGoogle) => {
  const { id, username, avatarUrl, email } = userData

  let jwtPayload: AccessTokenPayload
  const foundUser = await userService.getUserByEmail(email)

  if (foundUser) {
    jwtPayload = {
      UserInfo: {
        id: foundUser.userId,
        username: foundUser.user.username,
        avatarUrl: foundUser.user.avatarUrl ?? undefined,
        email: foundUser.email,
        roles: foundUser.user.roles
      }
    }
  } else {
    // if not existed create new user
    const account = await userService.createAccountWithGoogle({
      id,
      username,
      avatarUrl,
      email
    })
    jwtPayload = {
      UserInfo: {
        id: account.userId,
        username: account.user.username,
        avatarUrl: account.user.avatarUrl ?? undefined,
        email: account.email,
        roles: account.user.roles
      }
    }
  }

  return jwtPayload
}

const verifyRefreshToken = (refreshToken: string): Promise<CurrentUserData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await jwtService.decodeRefreshToken(refreshToken)
      if (!userData || !userData.id)
        return reject(new HttpError(401, 'Unauthorized/InvalidRefreshToken'))

      // check if refresh token is still valid
      const foundUser = await redisClient.get(`rft_${userData.id}`)
      if (!foundUser) return reject(new HttpError(401, 'Unauthorized/InvalidRefreshToken'))

      const currentUserData = JSON.parse(foundUser) as CurrentUserData

      // clear hacked user's refresh token
      if (
        currentUserData.refreshToken !== refreshToken ||
        currentUserData.userData.id !== userData.id
      ) {
        await jwtService.clearRefreshToken(currentUserData.refreshToken)
        return reject(new HttpError(401, 'Unauthorized/InvalidRefreshToken'))
      }

      resolve(currentUserData)
    } catch (error) {
      reject(new HttpError(500, 'Internal Server Error'))
    }
  })
}

export default {
  authenticateUser,
  validateGoogleIdToken,
  findOrCreateAccount,
  verifyRefreshToken
}
