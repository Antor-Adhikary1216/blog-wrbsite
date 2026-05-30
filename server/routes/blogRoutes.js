import { Router } from 'express'
import {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  getBlog,
  getBlogs,
  updateBlog,
} from '../controllers/blogController.js'
import { addComment, getComments } from '../controllers/commentController.js'
import {
  authenticate,
  authorizeRoles,
  optionalAuth,
} from '../middleware/authMiddleware.js'
import { requireDatabase } from '../middleware/requireDatabase.js'

const router = Router()
const adminOnly = [authenticate, authorizeRoles('admin')]

router.use(requireDatabase)

router.get('/', optionalAuth, getBlogs)
router.get('/admin', ...adminOnly, getAdminBlogs)
router.post('/', ...adminOnly, createBlog)
router.get('/:slug/comments', getComments)
router.post('/:slug/comments', authenticate, addComment)
router.get('/:slug', optionalAuth, getBlog)
router.put('/:id', ...adminOnly, updateBlog)
router.delete('/:id', ...adminOnly, deleteBlog)

export default router
