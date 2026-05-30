import { Router } from 'express'
import { pingDatabase } from '../controllers/dbController.js'

const router = Router()

router.get('/ping', pingDatabase)

export default router
