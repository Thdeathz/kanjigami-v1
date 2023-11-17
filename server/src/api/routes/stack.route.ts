import express from 'express'

import { createStack } from '../controllers/stack.controller'

const router = express.Router()

router.route('/').post(createStack)

export default router
