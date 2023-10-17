import express from 'express'

import { createNewUser, getAllUsers } from '~/controllers/users.controller'
import requireAdmin from '~/middleware/requireAdmin'
import verifyJWT from '~/middleware/verifyJWT'

const router = express.Router()

router.route('/').get(getAllUsers).post(createNewUser)

export default router
