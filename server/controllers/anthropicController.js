import { createMessage } from '../services/anthropicService.js'

export async function sendMessage(request, response, next) {
  try {
    const { message } = request.body

    if (!message || typeof message !== 'string') {
      return response.status(400).json({
        message: 'Send a non-empty string in the message field.',
      })
    }

    const result = await createMessage(message)
    return response.status(result.configured ? 200 : 503).json(result)
  } catch (error) {
    return next(error)
  }
}
