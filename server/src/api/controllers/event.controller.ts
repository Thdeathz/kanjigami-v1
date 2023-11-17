import { type RequestHandler } from 'express'
import eventService from '../services/event.service'
import { CreateEventReq, UpdateEventReq } from '../@types/event'

/**
 * @desc Get all events
 * @route GET /events
 * @access Public
 */
export const getAllEvents: RequestHandler = async (req, res) => {
  const events = await eventService.getAllEvents()

  res.json({ message: 'Get all events successfully', data: events })
}

/**
 * @desc Create an event
 * @route POST /events
 * @access Private
 */
export const createEvent: RequestHandler = async (req, res) => {
  const createEventRequest = <CreateEventReq>req.body

  const event = await eventService.createEvent(createEventRequest)

  res.json({ message: 'Create event successfully', data: event })
}

/**
 * @desc Get event by id
 * @route GET /events/:id
 * @access Public
 */
export const getEventById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const event = await eventService.findEventById(id)

  res.json({ message: 'Get event by id successfully', data: event })
}

/**
 * @desc Update event by id
 * @route PUT /events/:id
 * @access Private
 */
export const updateEventById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const updateEventRequest = <UpdateEventReq>req.body

  const event = await eventService.updateEventById(id, updateEventRequest)
  res.json({ message: 'Update event by id successfully', data: event })
}

/**
 * @desc Delete event by id
 * @route DELETE /events/:id
 * @access Private
 */
export const deleteEventById: RequestHandler = async (req, res) => {
  const event = await eventService.deleteEventById(<string>req.params.id)

  res.json({ message: 'Delete event by id successfully', data: event })
}
