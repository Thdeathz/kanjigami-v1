import express from 'express'

import {
  createStack,
  getAllStacks,
  getFollowedStacks,
  followStack,
  searchByName,
  getStackById,
  adminGetAllStacks
} from '../controllers/stack.controller'
import verifyJWT from '../middleware/verifyJWT'

const router = express.Router()

router.route('/').post(createStack).get(getAllStacks)

router.route('/follow').get(verifyJWT, getFollowedStacks)

router.route('/follow/:id').post(verifyJWT, followStack)

router.route('/admin/search').get(searchByName)

router.route('/admin').get(adminGetAllStacks)

router.route('/:id').get(getStackById)

export default router
