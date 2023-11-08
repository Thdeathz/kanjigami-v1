import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(12).required(),
  username: Joi.string().alphanum().required()
})
