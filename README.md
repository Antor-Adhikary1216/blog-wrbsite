# 📝 Blog India

**Blog India** is a responsive full-stack editorial blog website built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express.js**, **Firebase Authentication**, **MongoDB**, and **Firebase Admin**.

The project includes public blog pages, authentication, protected account pages, admin blog management, comments, email notifications, and optional Anthropic AI API support.

---

## 🚀 Live Demo

Live link:https://blog-wrbsite.onrender.com/

---

##

---

## ✨ Features

* 🏠 Modern blog homepage
* 📰 Public editorial/blog listing page
* 📖 Dynamic blog details page
* ℹ️ About page
* 📩 Contact page
* 🔐 Sign in and sign up system
* 🔥 Firebase Authentication support
* 👤 Protected account route
* 🛡️ Admin route protection
* ✍️ Admin blog create/edit page
* 📋 Admin blog management page
* 📝 Publish/draft blog management
* ⭐ Featured blog support
* 💬 Authenticated comments system
* 📧 Optional SMTP email notifications
* 🤖 Optional Anthropic AI API route
* 🍃 MongoDB database support
* ⚡ Fast Vite frontend
* 🌐 Express.js backend API

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* React Icons
* Firebase
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Firebase Admin
* Nodemailer
* CORS
* Dotenv
* Anthropic SDK

---

## 📁 Project Structure

```bash
blog-wrbsite/
├── scripts/
│   └── setFirebaseAdminClaim.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Antor-Adhikary1216/blog-wrbsite.git
```

### 2. Go to the project folder

```bash
cd blog-wrbsite
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment file

Copy `.env.example` and rename it to `.env`.

```bash
cp .env.example .env
```

For Windows, you can manually create a `.env` file and copy the values from `.env.example`.

---

## 🔐 Environment Variables

Add these values inside your `.env` file.

```env
PORT=5050
CLIENT_ORIGIN=http://localhost:5173

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/blog_website?retryWrites=true&w=majority&appName=<app-name>
MONGODB_DB_NAME=blog_website

VITE_FIREBASE_API_KEY=your-firebase-web-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
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

---

## ▶️ Run the Project

### Start client and server together

```bash
npm run dev
```

### Start frontend only

```bash
npm run dev:client
```

### Start backend only

```bash
npm run dev:server
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Runs the React frontend and Express API together.

```bash
npm run dev:client
```

Runs only the Vite frontend.

```bash
npm run dev:server
```

Runs only the Express backend server.

```bash
npm run build
```

Builds the React client for production.

```bash
npm run preview
```

Previews the production frontend build locally.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run start
```

Starts the Express server.

```bash
npm run admin:set -- user@example.com
```

Gives a Firebase user the `admin` custom claim.

---

## 🧩 Main Frontend Routes

| Route                   | Description               |
| ----------------------- | ------------------------- |
| `/`                     | Home page                 |
| `/blogs`                | Blog/editorial list page  |
| `/blogs/:slug`          | Dynamic blog details page |
| `/about`                | About page                |
| `/contact`              | Contact page              |
| `/sign-in`              | User sign in              |
| `/sign-up`              | User sign up              |
| `/account`              | Protected account page    |
| `/admin/blogs`          | Admin blog management     |
| `/admin/blogs/new`      | Create new blog           |
| `/admin/blogs/:id/edit` | Edit blog                 |
| `*`                     | Not found page            |

---

## 🔗 API Routes

| API Route            | Description                 |
| -------------------- | --------------------------- |
| `/api/health`        | API health check            |
| `/api/db`            | Database status/setup route |
| `/api/anthropic`     | Anthropic AI message route  |
| `/api/auth`          | Authentication-related APIs |
| `/api/blogs`         | Blog APIs                   |
| `/api/comments`      | Comment APIs                |
| `/api/notifications` | Notification/email APIs     |

---

## 🧠 How the App Works

The frontend is built with React and Vite. It uses React Router for navigation and separates pages, layouts, routes, services, hooks, context, and utilities.

The backend is built with Express.js. It connects to MongoDB when a database URI is configured. It also serves API routes for authentication, blogs, comments, notifications, database status, health check, and Anthropic AI messages.

Firebase is used for user authentication. Firebase Admin is used to manage admin access using custom claims. After setting Firebase Admin credentials, an admin can be created with:

```bash
npm run admin:set -- user@example.com
```

---

## 🔥 Firebase Setup

1. Create a Firebase project.
2. Enable Email/Password authentication.
3. Enable Google sign-in if needed.
4. Copy Firebase web app config into `.env`.
5. Generate Firebase Admin SDK credentials.
6. Add `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` into `.env`.
7. Run the admin claim script for your admin email.

---

## 📧 Email Setup

SMTP is optional. If SMTP values are added, the app can send login and registration success email notices.

For Gmail, use a **Gmail App Password**, not your normal Gmail password.

---

## 📌 Future Improvements

* Add image upload for blog thumbnails
* Add rich text editor for blog writing
* Add category filtering
* Add blog search functionality
* Add reading time calculation
* Add like/bookmark system
* Add dashboard analytics
* Add pagination for blogs
* Add live deployment link
* Add project screenshots

---

## 👨‍💻 Author

**Antor Adhikary**

GitHub: [Antor-Adhikary1216](https://github.com/Antor-Adhikary1216)

---

## 📄 License

This project is open source and available for learning and practice purposes.
