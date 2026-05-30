import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { env } from './env.js'
import { hasUsableSecret } from '../utils/config.js'

function normalizePrivateKey(privateKey) {
  return privateKey.replace(/\\n/g, '\n')
}

function isServiceAccountEmail(email) {
  return /^[^@\s]+@[^@\s]+\.gserviceaccount\.com$/i.test(email.trim())
}

function looksLikePrivateKey(privateKey) {
  const normalized = normalizePrivateKey(privateKey)
  return (
    normalized.includes('-----BEGIN PRIVATE KEY-----') &&
    normalized.includes('-----END PRIVATE KEY-----')
  )
}

function createConfigError(message) {
  const error = new Error(message)
  error.status = 503
  return error
}

function getConfigError() {
  if (
    !hasUsableSecret(env.firebaseProjectId) ||
    !hasUsableSecret(env.firebaseClientEmail) ||
    !hasUsableSecret(env.firebasePrivateKey)
  ) {
    return createConfigError(
      'Firebase Admin SDK is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to your .env file.',
    )
  }

  if (!isServiceAccountEmail(env.firebaseClientEmail)) {
    return createConfigError(
      'FIREBASE_CLIENT_EMAIL must be a Firebase service-account email ending in gserviceaccount.com.',
    )
  }

  if (!looksLikePrivateKey(env.firebasePrivateKey)) {
    return createConfigError(
      'Invalid FIREBASE_PRIVATE_KEY format. Use the exact private key from your Firebase service-account JSON with \\n escapes.',
    )
  }

  return null
}

export function hasFirebaseAdminConfig() {
  return getConfigError() === null
}

export function getFirebaseAdminAuth() {
  const configError = getConfigError()

  if (configError) {
    throw configError
  }

  if (!getApps().length) {
    try {
      initializeApp({
        credential: cert({
          projectId: env.firebaseProjectId,
          clientEmail: env.firebaseClientEmail,
          privateKey: normalizePrivateKey(env.firebasePrivateKey),
        }),
      })
    } catch {
      throw createConfigError(
        'Invalid FIREBASE_PRIVATE_KEY format. Use the exact private key from your Firebase service-account JSON with \\n escapes.',
      )
    }
  }

  return getAuth()
}
