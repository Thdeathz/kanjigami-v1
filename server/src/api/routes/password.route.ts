import express from 'express'

import validateRequest from '../middleware/validateRequest'
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOTPSchema
} from '../validations/password.validation'
import limitRequest from '../middleware/limitRequest'
import { forgotPassword, resetPassword, verifyOTPToken } from '../controllers/password.controller'

const router = express.Router()

router.route('/').post(limitRequest(5), validateRequest(forgotPasswordSchema), forgotPassword)

router.route('/verify').post(limitRequest(5), validateRequest(verifyOTPSchema), verifyOTPToken)

router.route('/reset').post(limitRequest(3), validateRequest(resetPasswordSchema), resetPassword)

export default router
