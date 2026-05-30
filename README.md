# Velvet Runway

Responsive full-stack luxury model blog built with React, Tailwind CSS,
Node.js, Express, JWT authentication, role-based access, and MongoDB Atlas.

## Features

- Public fashion/model blog homepage, archive, and detail pages.
- Sign-up, sign-in, logout, JWT auth, and protected account routes.
- Admin role flow with private invite code.
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

## Environment

Copy `.env.example` values into `.env` and replace placeholders with private
credentials.

```text
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
MONGODB_DB_NAME=blog_website
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
ADMIN_INVITE_CODE=replace-with-private-admin-code
ANTHROPIC_API_KEY=your-anthropic-api-key
ANTHROPIC_MODEL=claude-3-5-haiku-latest
```

Use `ADMIN_INVITE_CODE` during sign-up to create an admin account. Without a
MongoDB Atlas URI, public pages show demo editorials and API routes return clear
setup messages.
