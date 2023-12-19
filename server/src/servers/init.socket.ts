import { Server } from 'socket.io'

import httpServer from './init.http'
import corsOptions from '~/config/corsOptions'

const io = new Server(httpServer, {
  cors: corsOptions,
  path: '/api/socket/'
})

export default io
