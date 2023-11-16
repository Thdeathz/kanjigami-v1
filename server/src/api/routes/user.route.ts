import express from 'express'

import validateRequest from '../middleware/validateRequest'
import {
  createNewUser,
  getAllUsers,
  updateAvatar,
  uploadFile
} from '~/api/controllers/user.controller'
import requireAdmin from '~/api/middleware/requireAdmin'
import verifyJWT from '~/api/middleware/verifyJWT'
import { registerSchema } from '../validations/user.validation'
import upload from '~/config/init.multer'

const router = express.Router()

router
  .route('/')
  .get(verifyJWT, getAllUsers)
  .post(upload.single('avatar'), validateRequest(registerSchema), createNewUser)

router.route('/:id/avatar').post(upload.single('avatar'), updateAvatar)

router.route('/upload').get(upload.single('file'), uploadFile)

export default router
