import cors from 'cors'
import express from 'express'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import apiRoutes from './routes/index.js'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const clientDistPath = join(__dirname, '..', 'dist')
const clientIndexPath = join(clientDistPath, 'index.html')

const app = express()

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.use('/api', apiRoutes)

app.use('/api', (request, response) => {
  response.status(404).json({
    message: `API route not found: ${request.method} ${request.originalUrl}`,
  })
})

app.use(express.static(clientDistPath))

app.use((request, response, next) => {
  if (request.method !== 'GET' || request.path.startsWith('/api')) {
    return next()
  }

  if (!existsSync(clientIndexPath)) {
    return response.status(503).json({
      message:
        'React build not found. Run npm run build before starting the server.',
    })
  }

  return response.sendFile(clientIndexPath)
})

app.use(errorHandler)

export default app
