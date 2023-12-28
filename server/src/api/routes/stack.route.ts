import express from 'express'

import verifyJWT from '../middleware/verifyJWT'
import getCurrentUser from '../middleware/getCurrentUser'
import {
  createStack,
  getAllStacks,
  getFollowedStacks,
  followStack,
  searchByName,
  getStackById,
  adminGetAllStacks
} from '../controllers/stack.controller'
import upload from '~/config/init.multer'

const router = express.Router()

router
  .route('/')
  .post(verifyJWT, upload.array('images'), createStack)
  .get(getCurrentUser, getAllStacks)

router.route('/follow').get(verifyJWT, getFollowedStacks)

router.route('/follow/:id').post(verifyJWT, followStack)

router.route('/admin/search').get(searchByName)

router.route('/admin').get(adminGetAllStacks)

router.route('/:id').get(getStackById)

export default router
