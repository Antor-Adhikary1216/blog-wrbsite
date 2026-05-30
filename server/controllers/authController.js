import { env } from '../config/env.js'
import User from '../models/User.js'
import { hasUsableSecret } from '../utils/config.js'
import { signAuthToken } from '../utils/token.js'

function serializeAuth(user) {
  return {
    user: user.toJSON(),
    token: signAuthToken(user),
  }
}

export async function signUp(request, response, next) {
  try {
    const { name, email, password, adminInviteCode } = request.body
    const normalizedEmail = email?.toLowerCase().trim()

    if (!name || !normalizedEmail || !password) {
      return response
        .status(400)
        .json({ message: 'Name, email, and password are required.' })
    }

    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return response.status(409).json({ message: 'Email is already in use.' })
    }

    const canCreateAdmin =
      hasUsableSecret(env.adminInviteCode) &&
      adminInviteCode === env.adminInviteCode

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: canCreateAdmin ? 'admin' : 'user',
    })

    return response.status(201).json(serializeAuth(user))
  } catch (error) {
    return next(error)
  }
}

export async function signIn(request, response, next) {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
      '+password',
    )

    if (!user || !(await user.comparePassword(password))) {
      return response.status(401).json({ message: 'Invalid email or password.' })
    }

    return response.json(serializeAuth(user))
  } catch (error) {
    return next(error)
  }
}

export function getCurrentUser(request, response) {
  response.json({ user: request.user.toJSON() })
}

export function logout(_request, response) {
  response.json({ message: 'Logged out successfully.' })
}
