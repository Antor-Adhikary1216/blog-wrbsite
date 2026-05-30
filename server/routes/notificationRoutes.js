import { Router } from 'express'
import { sendAuthSuccessNotification } from '../controllers/notificationController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/auth-success', authenticate, sendAuthSuccessNotification)

export default router
