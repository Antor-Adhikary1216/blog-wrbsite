export function errorHandler(error, _request, response, _next) {
  void _next
  const statusCode = error.statusCode || error.status || 500

  if (statusCode >= 500) {
    console.error(error)
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      message: Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(' '),
    })
  }

  if (error.code === 11000) {
    return response.status(409).json({
      message: 'A record with that value already exists.',
    })
  }

  return response.status(statusCode).json({
    message: statusCode >= 500 ? 'Unexpected server error.' : error.message,
  })
}
