import { type RequestHandler } from 'express'
import Joi from 'joi'

type validateRequestType = (schema: Joi.ObjectSchema) => RequestHandler

const validateRequest: validateRequestType = schema => {
  return (req, res, next) => {
    const result = schema.validate(req.body)

    if (result.error)
      return res.status(400).json({
        message: 'Bad request',
        data: result.error.details[0].message.toString(),
        isError: true
      })

    if (!(req as any).value) (req as any).value = {}
    ;(req as any).value['body'] = result.value

    next()
  }
}

export default validateRequest
