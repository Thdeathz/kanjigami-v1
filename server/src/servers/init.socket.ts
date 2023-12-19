import { Server } from 'socket.io'
import dotenv from 'dotenv'

import corsOptions from '~/config/corsOptions'
import app from './init.express'

dotenv.config()
const PORT: string | 3500 = process.env.PORT || 3500

const io = new Server(
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  }),
  {
    cors: corsOptions,
    path: '/api/socket/'
  }
)

export default io
