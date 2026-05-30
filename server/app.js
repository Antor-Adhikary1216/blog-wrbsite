import cors from 'cors'
import express from 'express'
import apiRoutes from './routes/index.js'
import { env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    message: 'Blog India API is running.',
    health: '/api/health',
  })
})

app.use('/api', apiRoutes)

app.use('/api', (request, response) => {
  response.status(404).json({
    message: `API route not found: ${request.method} ${request.originalUrl}`,
  })
})

app.use(errorHandler)

export default app
