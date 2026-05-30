import { Router } from 'express'
import {
  getCurrentUser,
  logout,
  signIn,
  signUp,
} from '../controllers/authController.js'
import { authenticate } from '../middleware/authMiddleware.js'
import { requireDatabase } from '../middleware/requireDatabase.js'

const router = Router()

router.use(requireDatabase)

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/me', authenticate, getCurrentUser)
router.post('/logout', authenticate, logout)

export default router
