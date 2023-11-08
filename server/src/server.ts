import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import admin from 'firebase-admin'

import corsOptions from '~/config/corsOptions'
import serviceAccount from './config/firebase'
import { transporter } from './config/mailTransporter'
import errorHandler from '~/api/middleware/errorHandler'
import rootRoute from '~/api/routes/root.route'
import notFoundRoute from '~/api/routes/404.route'
import userRoutes from '~/api/routes/user.route'
import authRoutes from '~/api/routes/auth.route'
import resetPasswordRoutes from '~/api/routes/resetPassword.route'

dotenv.config()
const app = express()
const PORT: string | 3500 = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

/* MIDDLEWARE */
app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

/* CONFIG */
app.use('/api', express.static(path.join(__dirname, '../public')))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

/* ROUTES */
// public routes
app.use('/api', rootRoute)
app.use('/api/auth', authRoutes)
// app.use('/api/reset-password', resetPasswordRoutes)

// private routes
app.use('/api/users', userRoutes)
app.use('*', notFoundRoute)

app.use(errorHandler)

// nodemailer transporter testing
transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('💌 Server is ready to send emails')
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
