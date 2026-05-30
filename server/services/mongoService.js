import { connectDatabase, isDatabaseConfigured } from '../config/database.js'

export async function checkDatabaseConnection() {
  if (!isDatabaseConfigured()) {
    return {
      configured: false,
      message: 'MongoDB Atlas is not configured. Add MONGODB_URI to .env.',
    }
  }

  const connection = await connectDatabase()
  await connection.db.admin().ping()

  return {
    configured: true,
    message: 'MongoDB Atlas connection succeeded.',
  }
}
