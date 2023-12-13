import { Server } from 'socket.io'

import httpServer from './init.http'

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  path: '/api/socket/'
})

export default io
