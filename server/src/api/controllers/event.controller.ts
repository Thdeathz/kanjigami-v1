import type { RequestHandler } from 'express'

import eventService from '../services/event.service'
import { CreateEventRequest, UpdateEventReq } from '../@types/event'
import { EventStatus } from '@prisma/client'
import onlineHistoryService from '../services/online-history.service'
import firebaseService from '../services/firebase.service'

/**
 * @desc Get all events
 * @route GET /events
 * @access Public
 */
export const getAllEvents: RequestHandler = async (req, res) => {
  const status = (req.query.status as EventStatus) || EventStatus.UPCOMING
  const page = parseInt(req.query.page as string) || 1
  const { events, total } = await eventService.getAllEventsByStatus(status, page, 3)

  res.json({
    message: 'Get all events successfully',
    data: events,
    currentPage: page,
    totalPages: Math.ceil(total / 3)
  })
}

/**
 * @desc Create an event
 * @route POST /events
 * @access Private
 */
export const createEvent: RequestHandler = async (req, res) => {
  const createEventRequest = <CreateEventRequest>req.body
  const thumbnail = req.file?.buffer
  const extention = req.file?.originalname.split('.')[1]

  let thumbnailUrl: string | undefined = undefined
  if (thumbnail && extention)
    thumbnailUrl = await firebaseService.storeFile(thumbnail, 'images/events', extention)

  const event = await eventService.createEvent({
    ...createEventRequest,
    thumbnail: thumbnailUrl
  })

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

/**
 * @desc Get all events leaderboards
 * @route GET /events/leaderboards
 * @access Public
 */
export const getOnlineEventsLeaderboards: RequestHandler = async (req, res) => {
  const leaderboards = await onlineHistoryService.getOnlineEventsLeaderboards()

  res.json({
    message: 'Get online events leaderboards successfully',
    data: leaderboards
  })
}

/**
 * @desc Admin Get all events
 * @route GET /events/admin
 * @access Private
 */
export const adminGetAllEvents: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1
  const { events, total } = await eventService.getAllEvents(page, 10)

  res.json({
    message: 'Admin get all events successfully',
    data: events,
    currentPage: page,
    totalPages: Math.ceil(total / 10)
  })
}
