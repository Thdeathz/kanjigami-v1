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

const router = express.Router()

router.route('/admin').get(adminGetAllEvents)

router.route('/').get(getAllEvents).post(upload.single('thumbnail'), createEvent)

router.route('/leaderboards').get(getOnlineEventsLeaderboards)

router.route('/:id').get(getEventById).delete(deleteEventById)

export default router
