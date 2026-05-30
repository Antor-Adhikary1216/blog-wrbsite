import { Router } from 'express'
import anthropicRoutes from './anthropicRoutes.js'
import authRoutes from './authRoutes.js'
import blogRoutes from './blogRoutes.js'
import commentRoutes from './commentRoutes.js'
import dbRoutes from './dbRoutes.js'
import healthRoutes from './healthRoutes.js'
import notificationRoutes from './notificationRoutes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/db', dbRoutes)
router.use('/anthropic', anthropicRoutes)
router.use('/auth', authRoutes)
router.use('/blogs', blogRoutes)
router.use('/comments', commentRoutes)
router.use('/notifications', notificationRoutes)

export default router
