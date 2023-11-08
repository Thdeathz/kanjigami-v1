import dotenv from 'dotenv'
import { Redis } from 'ioredis'

dotenv.config()

const redisClient = new Redis(process.env.REDIS_URL as string)

export default redisClient
