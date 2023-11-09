import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import redisClient from '../databases/init.redis'
import HttpError from '../helpers/httpError'
import userService from './user.service'

const genNewOTP = async (accountId: string) => {
  try {
    const otpToken = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    })

    const hashedToken = bcrypt.hashSync(otpToken, 10)
    await redisClient.set(`rpwd_${accountId}`, hashedToken, 'EX', 90)

    return otpToken
  } catch (error) {
    throw new HttpError(500, 'Internal Server Error')
  }
}

const createResetPasswordToken = async (accountId: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { accountId },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '5m' },
      (err, token) => {
        console.log(err)
        if (err || !token) return reject(new HttpError(500, 'Internal Server Error'))

        resolve(token)
      }
    )
  })
}

const verifyOTPToken = async (otp: string, resetPwdToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(resetPwdToken, process.env.ACCESS_TOKEN_SECRET as string, async (err, decoded) => {
      if (err || !decoded) return reject(new HttpError(401, 'Unauthorized/InvalidToken'))

      const accountId = (decoded as any).accountId

      console.log(accountId)

      // get hashed token from redis
      const hashedToken = await redisClient.get(`rpwd_${accountId}`)
      if (!hashedToken) return reject(new HttpError(401, 'Unauthorized/InvalidToken'))

      const isValid = bcrypt.compareSync(otp, hashedToken)
      if (!isValid) return reject(new HttpError(401, 'Unauthorized/InvalidToken'))

      // del hashed token in redis
      await redisClient.del(`rpwd_${accountId}`)

      // verified token
      await redisClient.set(`rpwd_${resetPwdToken}_verified`, accountId, 'EX', 60 * 5)

      resolve(accountId)
    })
  })
}

const resetPassword = async (password: string, resetPwdToken: string) => {
  try {
    const foundedAccount = await redisClient.get(`rpwd_${resetPwdToken}_verified`)
    if (!foundedAccount) throw new HttpError(401, 'Unauthorized')

    await userService.resetPassword(foundedAccount, password)
  } catch (error) {
    if (error instanceof HttpError) throw error
    else throw new HttpError(500, 'Internal Server Error')
  }
}

export default {
  genNewOTP,
  createResetPasswordToken,
  verifyOTPToken,
  resetPassword
}
