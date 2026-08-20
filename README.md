# Full-Stack Task Management Application (MERN Stack)

A secure, production-ready full-stack Task Management application built with **Node.js, Express, React, and MongoDB**. The app allows registered users to create and manage personal tasks with live weather integration, file attachments, and automated email notifications.

---

## Live Links & Repositories

- **Frontend Deployment (Vercel):** `https://your-frontend-app.vercel.app`
- **Backend API (Render/Railway):** `https://your-backend-api.onrender.com`
- **GitHub Repository:** `https://github.com/your-username/task-management-mern`

---

## Tech Stack Overview

- **Frontend:** React.js (Vite), React Router v6, Axios, React Icons, TanStack Query, React Hot Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs password hashing
- **Third-Party Services:**
  - **File Attachments:** Cloudinary via Multer storage (`multer-storage-cloudinary`)
  - **Email Notifications:** Nodemailer (Gmail SMTP)
  - **Weather Integration:** OpenWeatherMap API

---

## Application Architecture

```
task-management-mern/
├── backend/                        # Node.js + Express REST API
│   ├── config/
│   │   ├── db.js                   # Mongoose connection logic
│   │   └── cloudinary.js           # Cloudinary & Multer configuration
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, GetMe handlers
│   │   └── taskController.js       # Full CRUD + filtering + pagination
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT Bearer token guard
│   │   └── errorMiddleware.js      # Centralized error handler
│   ├── models/
│   │   ├── User.js                 # User schema (name, email, hashed password)
│   │   └── Task.js                 # Task schema with User ObjectId reference
│   ├── routes/
│   │   ├── authRoutes.js           # POST /api/auth/register, /login, GET /me
│   │   └── taskRoutes.js           # GET/POST /api/tasks, GET/PUT/DELETE /api/tasks/:id
│   ├── utils/
│   │   ├── emailService.js         # Nodemailer task created/completed emails
│   │   └── weatherService.js       # OpenWeatherMap API wrapper
│   ├── .env.example                # Backend environment variable template
│   └── server.js                   # Express app entry point
│
└── frontend/                       # React SPA (Vite)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Top navigation bar with logout
    │   │   ├── TaskCard.jsx         # Individual task card with weather badge
    │   │   ├── TaskFormModal.jsx    # Create/Edit modal with file upload
    │   │   ├── WeatherBadge.jsx     # Live weather display component
    │   │   └── ProtectedRoute.jsx  # Redirects unauthenticated users
    │   ├── context/
    │   │   └── AuthContext.jsx      # Global JWT auth state
    │   ├── pages/
    │   │   ├── LoginPage.jsx        # Login form page
    │   │   ├── RegisterPage.jsx     # Registration form page
    │   │   └── DashboardPage.jsx    # Main task dashboard (card grid)
    │   ├── services/
    │   │   └── api.js               # Axios instance + Bearer token interceptors
    │   ├── App.jsx                  # Route definitions
    │   └── main.jsx                 # React root renderer
    ├── .env.example                 # Frontend environment variable template
    └── vite.config.js
```

---

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone 
cd task-management-mern
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks (filtered + paginated) | Yes |
| POST | `/api/tasks` | Create new task (supports file upload) | Yes |
| GET | `/api/tasks/:id` | Get single task + weather | Yes |
| PUT | `/api/tasks/:id` | Update task (supports file upload) | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| GET | `/api/tasks/:id/weather` | Get live weather for task location | Yes |

### GET /api/tasks — Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 9) |
| `status` | string | Filter by `PENDING`, `IN_PROGRESS`, `DONE` |
| `priority` | string | Filter by `LOW`, `MEDIUM`, `HIGH` |
| `search` | string | Search in title and description |
| `startDate` | ISO date | Filter tasks with due date from this date |
| `endDate` | ISO date | Filter tasks with due date until this date |
| `sortBy` | string | Sort field (default: `createdAt`) |
| `sortOrder` | string | `asc` or `desc` (default: `desc`) |

---

## Key Features

- **User Authentication:** Secure JWT registration and login with bcryptjs-hashed passwords. Tokens are stored in localStorage and auto-attached via Axios interceptors.
- **Card Grid Dashboard:** Tasks rendered as visual cards with priority badges (LOW / MEDIUM / HIGH) and status indicators (PENDING / IN_PROGRESS / DONE).
- **Live Weather Context:** Fetches real-time weather from OpenWeatherMap for each task's location field — temperature, conditions, and weather icon displayed on the card.
- **Cloud File Attachments:** Users can upload images or documents to Cloudinary via `multer-storage-cloudinary`. The file URL and name are stored on the task and displayed as a downloadable link.
- **Automated Emails:** Nodemailer (Gmail SMTP) sends a confirmation email on task creation and a completion notification when a task's status is changed to `DONE`.
- **Search, Filter & Pagination:** Server-side filtering by status, priority, search query, and due date range with page-based pagination.
- **Protected Routes:** React Router guards redirect unauthenticated users to `/login`.
- **Centralized Error Handling:** All Express errors funnel through a single error middleware, returning consistent JSON error shapes.

---

## Third-Party Service Setup

### Gmail App Password (Nodemailer)
1. Enable 2-Factor Authentication on your Google account.
2. Go to **Google Account → Security → App Passwords**.
3. Generate an app password for "Mail".
4. Use that 16-character password as `EMAIL_PASS` in `.env`.

### Cloudinary
1. Sign up at [cloudinary.com].
2. From your dashboard, copy **Cloud Name**, **API Key**, and **API Secret**.
3. Add them to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

### OpenWeatherMap
1. Sign up at [openweathermap.org].
2. Go to **API Keys** in your account dashboard.
3. Copy your default key into `OPENWEATHER_API_KEY`.
4. Free tier allows up to 60 calls/minute.

### MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas].
2. Create a database user and  use `0.0.0.0/0` for deployment.
3. Copy the connection string into `MONGO_URI`.

---

## Deployment

### Backend (Render)
1. Push repo to GitHub.
2. Create a new **Web Service** on Render.
3. Set **root directory** to `backend`.
4. Set **build command**: `npm install`
5. Set **start command**: `npm start`
6. Add all backend environment variables in the dashboard.

### Frontend (Vercel)
1. Import the repo into [vercel.com].
2. Set **root directory** to `frontend`.
3. Set `VITE_API_URL` to your live backend URL.
4. Deploy.

---

##  Trade-offs

- **State Management:** Used React Context API + Axios interceptors for auth state and TanStack Query for server state, keeping the stack lightweight without Redux overhead.
- **Synchronous Weather Fetches:** Weather is fetched per-task on the backend during individual task retrieval rather than in bulk, which simplifies the frontend but adds a small per-request delay for tasks with locations.
- **Email in Request Cycle:** Nodemailer sends emails inside the request handler (non-blocking with `.catch()`) rather than in a background queue, which is fine at small scale but not suitable for high traffic.

### What I'd Improve with More Time

- **Optimistic UI Updates:** Implement full TanStack Query mutation optimism so task edits and deletes feel instant without waiting for the server round-trip.
- **Task Activity Log:** Track status changes and edits with a per-task audit history so users can see the full lifecycle of a task.

---

