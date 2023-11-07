import { type RequestHandler } from 'express'
import jwtService from '../services/jwt.service'

const verifyJWT: RequestHandler = async (req, res, next) => {
  const authHeader = (req.headers.authorization || req.headers.Authorization) as string | undefined

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token: string = authHeader.split(' ')[1]

  const userData = await jwtService.decodeAccessToken(token)

  ;(req as any).currentUser = userData.UserInfo

  next()
}

export default verifyJWT
