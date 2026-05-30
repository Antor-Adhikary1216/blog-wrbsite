import { connectDatabase, isDatabaseConfigured } from '../config/database.js'

export async function requireDatabase(_request, response, next) {
  if (!isDatabaseConfigured()) {
    return response.status(503).json({
      message: 'MongoDB Atlas is not configured. Add MONGODB_URI to .env.',
    })
  }

  try {
    await connectDatabase()
    return next()
  } catch (error) {
    return next(error)
  }
}
