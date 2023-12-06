import Joi from 'joi'

export const UpdateCreateGameSchema = Joi.object({
  gameStackId: Joi.string().guid(),
  archievedPoints: Joi.number().min(0).required()
})
