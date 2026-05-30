import { checkDatabaseConnection } from '../services/mongoService.js'

export async function pingDatabase(_request, response, next) {
  try {
    const result = await checkDatabaseConnection()
    response.status(result.configured ? 200 : 503).json(result)
  } catch (error) {
    next(error)
  }
}
