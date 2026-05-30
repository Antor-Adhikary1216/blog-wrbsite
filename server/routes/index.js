import { Router } from 'express'
import anthropicRoutes from './anthropicRoutes.js'
import dbRoutes from './dbRoutes.js'
import healthRoutes from './healthRoutes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/db', dbRoutes)
router.use('/anthropic', anthropicRoutes)

export default router
