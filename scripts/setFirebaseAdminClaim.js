import { getFirebaseAdminAuth } from '../server/config/firebaseAdmin.js'

const email = process.argv[2]?.toLowerCase().trim()

if (!email) {
  console.error('Usage: npm run admin:set -- user@example.com')
  process.exit(1)
}

try {
  const adminAuth = getFirebaseAdminAuth()
  const user = await adminAuth.getUserByEmail(email)
  const customClaims = {
    ...(user.customClaims || {}),
    admin: true,
  }

  await adminAuth.setCustomUserClaims(user.uid, customClaims)
  console.log(`Admin claim enabled for ${email}. Sign out and sign in again.`)
} catch (error) {
  console.error(error.message || 'Unable to set admin claim.')
  process.exit(1)
}
