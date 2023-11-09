import { type RequestHandler } from 'express'
import userService from '../services/user.service'
import passwordService from '../services/password.service'
import mailerService from '../services/mailer.service'

/**
 * @desc Forgot Password
 * @route POST /reset-password/request
 * @access Public
 */
export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body

  const account = await userService.getUserByEmail(email)
  if (!account || !account.isActive)
    return res.status(401).json({ message: 'Unauthorized/InvalidEmail' })

  const otpToken = await passwordService.genNewOTP(account.id)

  await mailerService.sendResetPasswordOTP(account.email, otpToken)

  const passwordToken = await passwordService.createResetPasswordToken(account.id)

  res.cookie('pwd', passwordToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 3
  })

  res.json({
    message: 'Reset password email sent',
    data: {
      email: account.email
    }
  })
}

/**
 * @desc Verify OTP Token
 * @route POST /reset-password/verify
 * @access Public
 */
export const verifyOTPToken: RequestHandler = async (req, res) => {
  const resetPwdToken = req.cookies.pwd
  if (!resetPwdToken) return res.status(401).json({ message: 'Unauthorized/InvalidToken' })

  const { otpToken } = req.body

  await passwordService.verifyOTPToken(otpToken, resetPwdToken)

  res.json({
    message: 'OTP Token verified'
  })
}

/**
 * @desc Reset Password
 * @route POST /reset-password
 * @access Public
 */
export const resetPassword: RequestHandler = async (req, res) => {
  const { password } = req.body

  await passwordService.resetPassword(password, req.cookies.pwd)

  res.json({
    message: 'Password reset successfully'
  })
}
