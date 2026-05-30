import { apiRequest } from './apiClient.js'

export function sendAuthSuccessNotification(eventType) {
  return apiRequest('/api/notifications/auth-success', {
    method: 'POST',
    body: { eventType },
    allowError: true,
  })
}
