import app from './app.js'
import { connectDatabase, isDatabaseConfigured } from './config/database.js'
import { env } from './config/env.js'

async function startServer() {
  try {
    if (isDatabaseConfigured()) {
      await connectDatabase()
      console.log('MongoDB connected')
    } else {
      console.warn('MongoDB is not configured. API will return setup messages.')
    }
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
  }

  app.listen(env.port, () => {
    console.log(`API server listening on http://localhost:${env.port}`)
  })
}

startServer()
