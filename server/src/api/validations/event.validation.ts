import Joi from 'joi'

export const createEventSchema = Joi.object({
  description: Joi.string().required(),
  rounds: Joi.array()
    .items(
      Joi.object({
        gameId: Joi.string().guid().required(),
        stackId: Joi.string().guid().required()
      })
    )
    .required(),
  startTime: Joi.date().required(),
  lobbyTime: Joi.date().required(),
  maxPlayers: Joi.number().required(),
  tags: Joi.string().required()
})
