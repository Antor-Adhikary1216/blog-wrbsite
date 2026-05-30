import { getMongoDatabase, isMongoConfigured } from '../config/mongo.js'

export async function checkDatabaseConnection() {
  if (!isMongoConfigured()) {
    return {
      configured: false,
      message: 'MongoDB Atlas is not configured. Add MONGODB_URI to .env.',
    }
  }

  const database = await getMongoDatabase()
  await database.command({ ping: 1 })

  return {
    configured: true,
    message: 'MongoDB Atlas connection succeeded.',
  }
}
