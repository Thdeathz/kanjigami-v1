import { Server } from 'socket.io'
import dotenv from 'dotenv'

import corsOptions from '~/config/corsOptions'
import { expressServer } from './init.express'

dotenv.config()
const PORT: string | 3500 = process.env.PORT || 3500

const io = new Server(expressServer, {
  cors: corsOptions,
  path: '/api/socket/'
})

export default io
