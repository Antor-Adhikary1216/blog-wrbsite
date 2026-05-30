import { apiRequest } from './apiClient.js'

export function sendAnthropicMessage(message) {
  return apiRequest('/api/anthropic/message', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}
