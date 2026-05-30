# Blog Website

Full-stack React starter with Tailwind CSS, an Express API, MongoDB Atlas wiring,
and Anthropic API wiring.

## Scripts

- `npm run dev` - run the React client and Express API together.
- `npm run dev:client` - run only Vite.
- `npm run dev:server` - run only the Express API.
- `npm run build` - build the React client.
- `npm run lint` - lint client and server code.
- `npm run start` - start the Express API.

## Structure

```text
src/
  components/   reusable UI grouped by feature or role
  context/      app-level providers and React context objects
  hooks/        reusable React hooks
  layouts/      shared page layout shells
  pages/        route-level screens
  routes/       route definitions and route constants
  services/     browser API clients and service calls
  utils/        shared constants and formatting helpers

server/
  config/       environment and integration configuration
  controllers/  request handlers
  middleware/   Express middleware
  routes/       API route modules
  services/     MongoDB and Anthropic integration logic
  utils/        server-only helpers
```

## Environment

Copy `.env.example` values into `.env` and replace placeholders with private
credentials when you are ready to connect external services.

```text
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
MONGODB_DB_NAME=blog_website
ANTHROPIC_API_KEY=your-anthropic-api-key
ANTHROPIC_MODEL=claude-3-5-haiku-latest
```
