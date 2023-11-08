// import { type RequestHandler } from 'express'
// import otpGenerator from 'otp-generator'
// import bcrypt from 'bcrypt'

// import { sendResetPasswordEmail } from '~/api/helpers/mailer'
// import prisma from '../databases/init.prisma'

// /**
//  * @desc Forgot Password
//  * @route POST /reset-password/request
//  * @access Public
//  */
// export const forgotPassword: RequestHandler = async (req, res) => {
//   const { email } = req.body

//   const foundUser = await prisma.user.findUnique({ where: { email } })
//   if (!foundUser || !foundUser.active)
//     return res.status(401).json({ message: 'Unauthorized/InvalidEmail' })

//   await prisma.resetPassword.updateMany({
//     where: { email, isActive: true },
//     data: { isActive: false }
//   })

//   const otpToken = otpGenerator.generate(4, {
//     lowerCaseAlphabets: false,
//     upperCaseAlphabets: false,
//     specialChars: false
//   })
//   const hashedToken = await bcrypt.hash(otpToken, 10)
//   await prisma.resetPassword.create({
//     data: {
//       email: foundUser.email,
//       token: hashedToken,
//       expries: new Date(Date.now() + 90 * 1000)
//     }
//   })

//   await sendResetPasswordEmail(foundUser.email, otpToken)

//   res.json({
//     message: 'Reset password email sent',
//     data: {
//       email: foundUser.email
//     }
//   })
// }

// /**
//  * @desc Verify OTP Token
//  * @route POST /reset-password/verify
//  * @access Public
//  */
// export const verifyOTPToken: RequestHandler = async (req, res) => {
//   const { email, otpToken } = req.body

//   const foundUser = await prisma.resetPassword.findFirst({
//     where: {
//       email,
//       isActive: true,
//       verified: false,
//       expries: { gt: new Date() }
//     }
//   })
//   if (!foundUser) return res.status(401).json({ message: 'Unauthorized/TokenExpired' })

//   const isMatch: boolean = await bcrypt.compare(otpToken, foundUser.token)
//   if (!isMatch) return res.status(401).json({ message: 'Unauthorized/InvalidToken' })

//   foundUser.verified = true
//   await prisma.resetPassword.update({
//     where: { id: foundUser.id },
//     data: { verified: true }
//   })

//   res.json({
//     message: 'OTP Token verified'
//   })
// }

// /**
//  * @desc Reset Password
//  * @route POST /reset-password
//  * @access Public
//  */
// export const resetPassword: RequestHandler = async (req, res) => {
//   const { email, password } = req.body

//   const foundResetPassword = await prisma.resetPassword.findFirst({
//     where: {
//       email,
//       isActive: true,
//       verified: true
//     }
//   })
//   if (!foundResetPassword) return res.status(401).json({ message: 'Unauthorized/InvalidToken' })

//   const hashedPassword = await bcrypt.hash(password, 10)
//   // reset password for user
//   await prisma.user.update({
//     where: { email },
//     data: { password: hashedPassword }
//   })

//   // invalid reset password token
//   await prisma.resetPassword.update({
//     where: { id: foundResetPassword.id },
//     data: { isActive: false }
//   })

//   res.json({
//     message: 'Password reset successfully'
//   })
// }
