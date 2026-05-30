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
    if (
      error.name === 'MongooseServerSelectionError' ||
      error.name === 'MongoServerSelectionError'
    ) {
      return response.status(503).json({
        message:
          'Cannot connect to MongoDB Atlas. Check your Atlas IP whitelist, database user, password, and connection string.',
      })
    }

    return next(error)
  }
}
