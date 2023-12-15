import { createServer } from 'http'
import dotenv from 'dotenv'
import app from './init.express'

dotenv.config()
const PORT: string | 3500 = process.env.PORT || 3500

const httpServer = createServer(app)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

export default httpServer
