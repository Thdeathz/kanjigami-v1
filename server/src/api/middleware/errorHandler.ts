import { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status: number = err.statusCode || res.statusCode || 500

  if (process.env.NODE_ENV === 'development') console.error(err)

  res.status(status).json({
    message: err.message,
    isError: true
  })
}

export default errorHandler
