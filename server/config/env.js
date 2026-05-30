import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT || 5050),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || '',
  mongoDbName: process.env.MONGODB_DB_NAME || 'blog_website',
  jwtSecret:
    process.env.JWT_SECRET || 'local-development-secret-change-before-deploy',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminInviteCode: process.env.ADMIN_INVITE_CODE || '',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest',
}
