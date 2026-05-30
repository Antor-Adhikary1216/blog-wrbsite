import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { hasUsableSecret } from '../utils/config.js'

let transporter

function isEmailConfigured() {
  return (
    hasUsableSecret(env.smtpHost) &&
    hasUsableSecret(env.smtpUser) &&
    hasUsableSecret(env.smtpPass) &&
    hasUsableSecret(env.smtpFrom)
  )
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    })
  }

  return transporter
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function buildAuthEmail({ eventType, user }) {
  const isSignup = eventType === 'signup'
  const subject = isSignup
    ? 'Welcome to Blog India'
    : 'New sign-in to Blog India'
  const greeting = user.name ? `Hi ${user.name},` : 'Hi there,'
  const safeGreeting = escapeHtml(greeting)
  const message = isSignup
    ? 'Your Blog India account was created successfully.'
    : 'You have successfully signed in to Blog India.'

  return {
    subject,
    text: `${greeting}\n\n${message}\n\nIf this was you, no action is needed.\n\nBlog India`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b">
        <h2 style="margin:0 0 16px">Blog India</h2>
        <p>${safeGreeting}</p>
        <p>${message}</p>
        <p>If this was you, no action is needed.</p>
        <p style="margin-top:24px;color:#71717a">Blog India</p>
      </div>
    `,
  }
}

export async function sendAuthSuccessEmail({ eventType, user }) {
  if (!isEmailConfigured()) {
    return {
      sent: false,
      message: 'Email service is not configured yet.',
    }
  }

  const email = buildAuthEmail({ eventType, user })

  await getTransporter().sendMail({
    from: env.smtpFrom,
    to: user.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  })

  return {
    sent: true,
    message: 'Success email sent.',
  }
}
