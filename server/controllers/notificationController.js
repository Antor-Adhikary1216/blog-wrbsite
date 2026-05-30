import { sendAuthSuccessEmail } from '../services/emailService.js'

const AUTH_EVENTS = new Set(['signin', 'signup'])

export async function sendAuthSuccessNotification(request, response, next) {
  try {
    const { eventType } = request.body

    if (!AUTH_EVENTS.has(eventType)) {
      return response.status(400).json({
        message: 'A valid auth event type is required.',
      })
    }

    const result = await sendAuthSuccessEmail({
      eventType,
      user: request.user,
    })

    return response.status(result.sent ? 202 : 200).json(result)
  } catch (error) {
    return next(error)
  }
}
