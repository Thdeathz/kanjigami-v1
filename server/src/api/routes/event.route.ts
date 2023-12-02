import express from 'express'

import upload from '~/config/init.multer'
import {
  adminGetAllEvents,
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  getOnlineEventsLeaderboards
} from '../controllers/event.controller'
import verifyJWT from '../middleware/verifyJWT'

const route = express.Router()

route.route('/admin').get(adminGetAllEvents)

route.route('/').get(getAllEvents).post(upload.single('thumbnail'), createEvent)

route.route('/leaderboards').get(getOnlineEventsLeaderboards)

route.route('/:id').get(getEventById).delete(deleteEventById)

export default route
