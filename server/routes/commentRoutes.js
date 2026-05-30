import { Router } from 'express'
import { deleteComment } from '../controllers/commentController.js'
import { authenticate } from '../middleware/authMiddleware.js'
import { requireDatabase } from '../middleware/requireDatabase.js'

const router = Router()

router.use(requireDatabase)
router.delete('/:id', authenticate, deleteComment)

export default router
