import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const loginWithGoogleSchema = Joi.object({
  googleIdToken: Joi.string().required()
})
