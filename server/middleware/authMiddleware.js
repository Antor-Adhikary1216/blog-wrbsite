import User from '../models/User.js'
import { verifyAuthToken } from '../utils/token.js'

function getBearerToken(request) {
  const authHeader = request.headers.authorization || ''

  if (!authHeader.startsWith('Bearer ')) {
    return null
  }

  return authHeader.slice(7)
}

export async function authenticate(request, response, next) {
  try {
    const token = getBearerToken(request)

    if (!token) {
      return response.status(401).json({ message: 'Authentication required.' })
    }

    const payload = verifyAuthToken(token)
    const user = await User.findById(payload.sub)

    if (!user) {
      return response.status(401).json({ message: 'User no longer exists.' })
    }

    request.user = user
    return next()
  } catch {
    return response.status(401).json({ message: 'Invalid or expired token.' })
  }
}

export async function optionalAuth(request, _response, next) {
  try {
    const token = getBearerToken(request)

    if (token) {
      const payload = verifyAuthToken(token)
      request.user = await User.findById(payload.sub)
    }
  } catch {
    request.user = null
  }

  return next()
}

export function authorizeRoles(...roles) {
  return (request, response, next) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return response.status(403).json({ message: 'You do not have access.' })
    }

    return next()
  }
}
