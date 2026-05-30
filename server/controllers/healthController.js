export function getHealth(_request, response) {
  response.json({
    status: 'ok',
    message: 'Express API is running.',
    timestamp: new Date().toISOString(),
  })
}
