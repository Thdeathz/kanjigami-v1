import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import admin from 'firebase-admin'

import app from '~/servers/init.express'
import io from '~/servers/init.socket'
import transporter from '~/servers/init.mailer'

import corsOptions from '~/config/corsOptions'
import serviceAccount from '~/config/firebase'

import socketEvent from './api/socket/socket'
import errorHandler from '~/api/middleware/errorHandler'
import rootRoute from '~/api/routes/root.route'
import notFoundRoute from '~/api/routes/404.route'
import userRoutes from '~/api/routes/user.route'
import authRoutes from '~/api/routes/auth.route'
import eventRoutes from '~/api/routes/event.route'
import stackRoutes from '~/api/routes/stack.route'
import passwordRoutes from '~/api/routes/password.route'
import gameRoutes from '~/api/routes/game.route'
import kanjiRoutes from '~/api/routes/kanji.route'
import gameLogRoutes from '~/api/routes/game-log.route'

dotenv.config()

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
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
})

/* ROUTES */
// public routes
app.use('/api', rootRoute)
app.use('/api/auth', authRoutes)
app.use('/api/password', passwordRoutes)

// private routes
app.use('/api/events', eventRoutes)
app.use('/api/stacks', stackRoutes)
app.use('/api/kanjis', kanjiRoutes)
app.use('/api/games', gameRoutes)
app.use('/api/game-log', gameLogRoutes)
app.use('/api/user', userRoutes)
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

io.on('connection', socketEvent)
