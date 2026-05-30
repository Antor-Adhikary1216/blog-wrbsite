import { MongoClient } from 'mongodb'
import { env } from './env.js'
import { hasUsableSecret } from '../utils/config.js'

let clientPromise

export function isMongoConfigured() {
  return hasUsableSecret(env.mongoUri)
}

export function getMongoClient() {
  if (!isMongoConfigured()) {
    return null
  }

  if (!clientPromise) {
    const client = new MongoClient(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })

    clientPromise = client.connect()
  }

  return clientPromise
}

export async function getMongoDatabase() {
  const client = await getMongoClient()
  return client.db(env.mongoDbName)
}
