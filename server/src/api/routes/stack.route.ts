import express from 'express'

import {
  createStack,
  getAllStack,
  getFollowedStacks,
  followStack,
  searchByName
} from '../controllers/stack.controller'
import verifyJWT from '../middleware/verifyJWT'

const router = express.Router()

router.route('/').post(createStack).get(getAllStack)

router.route('/follow').get(verifyJWT, getFollowedStacks)

router.route('/follow/:id').post(verifyJWT, followStack)

router.route('/admin/search').get(searchByName)

export default router
