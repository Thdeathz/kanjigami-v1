import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const PORT: string | 3500 = process.env.PORT || 3500

const app = express()

export const expressServer = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

export default app
