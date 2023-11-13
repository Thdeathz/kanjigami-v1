import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status: number = err.statusCode || res.statusCode || 500

  console.error(err)

  res.status(status).json({
    message: err.message,
    isError: true
  })
}

export default errorHandler
