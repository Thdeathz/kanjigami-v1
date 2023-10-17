import { RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'

// import ResetPassword from '~/models/ResetPassword.model'
// import User from '~/models/User.model'
import { sendResetPasswordEmail } from '~/utils/mailer'
import prisma from '~/config/dbConnect'

/**
 * @desc Forgot Password
 * @route POST /reset-password/request
 * @access Public
 */
export const forgotPassword: RequestHandler = asyncHandler(async (req, res) => {
  const email = req.body.email as string | undefined
  if (!email) {
    res.status(400).json({ message: 'Please provide all required fields' })
    return
  }

  const foundUser = await prisma.user.findUnique({ where: { email } })
  if (!foundUser || !foundUser.active) {
    res.status(401).json({ message: 'Unauthorized/InvalidEmail' })
    return
  }
  await prisma.resetPassword.updateMany({
    where: { email, isActive: true },
    data: { isActive: false }
  })

  const otpToken = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  })
  const hashedToken = await bcrypt.hash(otpToken, 10)
  await prisma.resetPassword.create({
    data: {
      email: foundUser.email,
      token: hashedToken,
      expries: new Date(Date.now() + 90 * 1000)
    }
  })

  try {
    await sendResetPasswordEmail(foundUser.email, otpToken)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
  res.json({
    message: 'Reset password email sent',
    data: {
      email: foundUser.email
    }
  })
})

/**
 * @desc Verify OTP Token
 * @route POST /reset-password/verify
 * @access Public
 */
export const verifyOTPToken: RequestHandler = asyncHandler(async (req, res) => {
  const email = req.body.email as string | undefined
  const otpToken = req.body.otpToken as string | undefined
  if (!email || !otpToken) {
    res.status(400).json({ message: 'Please provide all required fields' })
    return
  }

  const foundUser = await prisma.resetPassword.findFirst({
    where: {
      email,
      isActive: true,
      verified: false,
      expries: { gt: new Date() }
    }
  })
  if (!foundUser) {
    res.status(401).json({ message: 'Unauthorized/TokenExpired' })
    return
  }

  const isMatch: boolean = await bcrypt.compare(otpToken, foundUser.token)
  if (!isMatch) {
    res.status(401).json({ message: 'Unauthorized/InvalidToken' })
    return
  }
  foundUser.verified = true
  await prisma.resetPassword.update({
    where: { id: foundUser.id },
    data: { verified: true }
  })

  res.json({
    message: 'OTP Token verified'
  })
})

/**
 * @desc Reset Password
 * @route POST /reset-password
 * @access Public
 */
export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const email = req.body.email as string | undefined
  const password = req.body.password as string | undefined
  if (!email || !password) {
    res.status(400).json({ message: 'Please provide all required fields' })
    return
  }

  const foundResetPassword = await prisma.resetPassword.findFirst({
    where: {
      email,
      isActive: true,
      verified: true
    }
  })
  if (!foundResetPassword) {
    res.status(401).json({ message: 'Unauthorized/InvalidToken' })
    return
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  // reset password for user
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  })

  // invalid reset password token
  await prisma.resetPassword.update({
    where: { id: foundResetPassword.id },
    data: { isActive: false }
  })

  res.json({
    message: 'Password reset successfully'
  })
})
