# Blog India

Responsive full-stack India-focused editorial blog built with React, Tailwind
CSS, Node.js, Express, Firebase Authentication, role-based access, and MongoDB
Atlas.

## Features

- Public India-focused blog homepage, archive, and detail pages.
- Email/password and Google sign-in powered by Firebase Authentication.
- Protected account routes and admin access through Firebase custom claims.
- Login and registration success pop-ups with optional SMTP email notices.
- Admin blog management: create, edit, publish/draft, feature, and delete.
- Authenticated comments on published blogs.
- Clean client folders for pages, routes, layouts, components, hooks, context,
  services, data, and utilities.
- Clean server folders for config, models, middleware, routes, controllers,
  services, and utilities.

## Scripts

- `npm run dev` - run the React client and Express API together.
- `npm run dev:client` - run only Vite.
- `npm run dev:server` - run only the Express API.
- `npm run build` - build the React client.
- `npm run lint` - lint client and server code.
- `npm run start` - start the Express API.
- `npm run admin:set -- user@example.com` - grant the Firebase `admin` custom
  claim.

## Environment

Copy `.env.example` values into `.env` and replace placeholders with private
credentials.

```text
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
MONGODB_DB_NAME=blog_website
VITE_FIREBASE_API_KEY=your-firebase-web-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@example.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM="Blog India <no-reply@example.com>"
ANTHROPIC_API_KEY=your-anthropic-api-key
ANTHROPIC_MODEL=claude-3-5-haiku-latest
```

Enable Email/password and Google providers in Firebase Console. Use
`npm run admin:set -- user@example.com` to create an admin after adding Firebase
Admin SDK credentials to `.env`. Add SMTP values to send login and registration
success emails. Without SMTP values, users still see the in-app success pop-up.
Without a MongoDB Atlas URI, public pages use local demo editorials and API
routes return clear setup messages.
