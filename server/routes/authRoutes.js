import { Router } from 'express'
import { getCurrentUser } from '../controllers/authController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

function legacyFirebaseAuthNotice(_request, response) {
  response.status(410).json({
    message:
      'This app now uses Firebase Authentication. Refresh the browser and use the Firebase sign-in form.',
  })
}

router.post('/signup', legacyFirebaseAuthNotice)
router.post('/signin', legacyFirebaseAuthNotice)
router.post('/logout', legacyFirebaseAuthNotice)
router.get('/me', authenticate, getCurrentUser)

export default router
