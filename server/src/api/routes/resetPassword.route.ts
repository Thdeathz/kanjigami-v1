import express from 'express'

import limitRequest from '~/api/middleware/limitRequest'
import validateRequest from '../middleware/validateRequest'
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOTPSchema
} from '../validations/resetPassword.validation'
import {
  forgotPassword,
  resetPassword,
  verifyOTPToken
} from '~/api/controllers/resetPassword.controller'

const router = express.Router()

router.route('/').post(limitRequest(5), validateRequest(resetPasswordSchema), resetPassword)

router
  .route('/request')
  .post(limitRequest(5), validateRequest(forgotPasswordSchema), forgotPassword)

router.route('/verify').post(limitRequest(5), validateRequest(verifyOTPSchema), verifyOTPToken)

export default router
