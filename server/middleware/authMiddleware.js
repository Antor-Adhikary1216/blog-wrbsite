import User from '../models/User.js'
import { connectDatabase, isDatabaseConfigured } from '../config/database.js'
import { getFirebaseAdminAuth } from '../config/firebaseAdmin.js'

function getBearerToken(request) {
  const authHeader = request.headers.authorization || ''

  if (!authHeader.startsWith('Bearer ')) {
    return null
  }

  return authHeader.slice(7)
}

function getDisplayName(decodedToken) {
  if (decodedToken.name?.trim() && decodedToken.name.trim().length >= 2) {
    return decodedToken.name.trim()
  }

  const emailName = decodedToken.email?.split('@')[0]?.replace(/[._-]+/g, ' ')

  if (emailName?.trim() && emailName.trim().length >= 2) {
    return emailName.trim()
  }

  return 'Blog India Reader'
}

async function syncFirebaseUser(decodedToken) {
  const email = decodedToken.email?.toLowerCase().trim()

  if (!email) {
    const error = new Error('A verified email address is required.')
    error.status = 401
    throw error
  }

  const role = decodedToken.admin === true ? 'admin' : 'user'
  const profile = {
    firebaseUid: decodedToken.uid,
    email,
    name: getDisplayName(decodedToken),
    avatarUrl: decodedToken.picture || '',
    role,
  }

  let user =
    (await User.findOne({ firebaseUid: decodedToken.uid })) ||
    (await User.findOne({ email }))

  if (!user) {
    return User.create(profile)
  }

  user.set(profile)
  return user.save()
}

async function ensureDatabaseForAuth() {
  if (!isDatabaseConfigured()) {
    const error = new Error('MongoDB Atlas is not configured. Add MONGODB_URI to .env.')
    error.status = 503
    throw error
  }

  try {
    await connectDatabase()
  } catch (error) {
    if (
      error.name === 'MongooseServerSelectionError' ||
      error.name === 'MongoServerSelectionError'
    ) {
      const databaseError = new Error(
        'Cannot connect to MongoDB Atlas. Check your Atlas IP whitelist, database user, password, and connection string.',
      )
      databaseError.status = 503
      throw databaseError
    }

    error.status = error.status || 500
    throw error
  }
}

async function verifyAndSyncUser(token) {
  const decodedToken = await getFirebaseAdminAuth().verifyIdToken(token)
  await ensureDatabaseForAuth()
  const user = await syncFirebaseUser(decodedToken)

  return { decodedToken, user }
}

export async function authenticate(request, response, next) {
  try {
    const token = getBearerToken(request)

    if (!token) {
      return response.status(401).json({ message: 'Authentication required.' })
    }

    const { decodedToken, user } = await verifyAndSyncUser(token)

    request.user = user
    request.firebaseToken = decodedToken
    return next()
  } catch (error) {
    return response.status(error.status || 401).json({
      message: error.status ? error.message : 'Invalid or expired Firebase token.',
    })
  }
}

export async function optionalAuth(request, _response, next) {
  try {
    const token = getBearerToken(request)

    if (token) {
      const { decodedToken, user } = await verifyAndSyncUser(token)
      request.user = user
      request.firebaseToken = decodedToken
    }
  } catch {
    request.user = null
    request.firebaseToken = null
  }

  return next()
}

export function authorizeRoles(...roles) {
  return (request, response, next) => {
    const isAdminRoute = roles.includes('admin')

    if (isAdminRoute && request.firebaseToken?.admin !== true) {
      return response.status(403).json({ message: 'You do not have access.' })
    }

    if (!isAdminRoute && (!request.user || !roles.includes(request.user.role))) {
      return response.status(403).json({ message: 'You do not have access.' })
    }

    return next()
  }
}
