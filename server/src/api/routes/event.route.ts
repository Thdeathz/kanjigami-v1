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

route.route('/').get(getAllEvents).post(validateRequest(createEventSchema), createEvent)

route.route('/:id').get(getEventById).put(updateEventById).delete(deleteEventById)

export default route
