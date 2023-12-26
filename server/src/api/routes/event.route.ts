import express from 'express'

import upload from '~/config/init.multer'
import {
  adminGetAllEvents,
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  getLastestUserOnlineStats,
  getOnlineEventsLeaderboards
} from '../controllers/event.controller'
import verifyJWT from '../middleware/verifyJWT'
import getCurrentUser from '../middleware/getCurrentUser'

const router = express.Router()

router.route('/admin').get(adminGetAllEvents)

router.route('/stats').get(verifyJWT, getLastestUserOnlineStats)

router.route('/').get(getAllEvents).post(upload.single('thumbnail'), createEvent)

router.route('/leaderboards').get(getOnlineEventsLeaderboards)

router.route('/:id').get(getCurrentUser, getEventById).delete(deleteEventById)

export default router
