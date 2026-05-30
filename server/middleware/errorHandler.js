export function errorHandler(error, _request, response, _next) {
  void _next
  const statusCode = error.statusCode || error.status || 500

  if (statusCode >= 500) {
    console.error(error)
  }

  response.status(statusCode).json({
    message: statusCode >= 500 ? 'Unexpected server error.' : error.message,
  })
}
