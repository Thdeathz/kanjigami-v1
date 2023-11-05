import express from 'express'

import validateRequest from '../middleware/validateRequest'
import { createNewUser, getAllUsers } from '~/api/controllers/user.controller'
import requireAdmin from '~/api/middleware/requireAdmin'
import verifyJWT from '~/api/middleware/verifyJWT'
import { registerSchema } from '../validations/user.validation'

const router = express.Router()

router.route('/').get(verifyJWT, getAllUsers).post(validateRequest(registerSchema), createNewUser)

export default router
