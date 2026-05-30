import mongoose from 'mongoose'
import { env } from './env.js'
import { hasUsableSecret } from '../utils/config.js'

let connectionPromise

export function isDatabaseConfigured() {
  return hasUsableSecret(env.mongoUri)
}

export async function connectDatabase() {
  if (!isDatabaseConfigured()) {
    return null
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.mongoUri, {
      dbName: env.mongoDbName,
      serverSelectionTimeoutMS: 8000,
    })
  }

  try {
    await connectionPromise
  } catch (error) {
    connectionPromise = null
    throw error
  }

  return mongoose.connection
}
