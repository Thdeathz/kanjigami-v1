import Joi from 'joi'

export const startGameRequestSchema = Joi.object({
  numberKanji: Joi.number().required(),
  time: Joi.number().required()
})
