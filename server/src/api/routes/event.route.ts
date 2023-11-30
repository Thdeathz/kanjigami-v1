import express from 'express'

import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById
} from '../controllers/event.controller'
import { createEventSchema } from '../validations/event.validation'
import validateRequest from '../middleware/validateRequest'

const route = express.Router()

route.route('/').get(getAllEvents).post(createEvent)

route.route('/:id').get(getEventById).delete(deleteEventById)

export default route
