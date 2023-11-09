import Joi from 'joi'

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
})

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(4).max(12).required()
})

export const verifyOTPSchema = Joi.object({
  otpToken: Joi.string().min(4).max(4).required()
})
