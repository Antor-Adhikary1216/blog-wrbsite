import Anthropic from '@anthropic-ai/sdk'
import { env } from '../config/env.js'
import { hasUsableSecret } from '../utils/config.js'

let client

function getClient() {
  if (!hasUsableSecret(env.anthropicApiKey)) {
    return null
  }

  if (!client) {
    client = new Anthropic({
      apiKey: env.anthropicApiKey,
    })
  }

  return client
}

export async function createMessage(message) {
  const anthropic = getClient()

  if (!anthropic) {
    return {
      configured: false,
      message: 'Anthropic is not configured. Add ANTHROPIC_API_KEY to .env.',
    }
  }

  const response = await anthropic.messages.create({
    model: env.anthropicModel,
    max_tokens: 300,
    messages: [{ role: 'user', content: message }],
  })

  const text = response.content
    .filter((item) => item.type === 'text')
    .map((item) => item.text)
    .join('\n')

  return {
    configured: true,
    message: text,
  }
}
