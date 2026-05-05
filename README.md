# 💬 Web Chat App

A full-stack real-time chat application built with **React**, **Node.js**, **Socket.IO**, and **PostgreSQL** (hosted on Supabase). Users can sign up, log in, browse all registered users, and exchange messages in real time — including image attachments.

---

## ✨ Features

- 🔐 **Authentication** — Sign up, log in, and log out with JWT-based auth stored in HTTP-only cookies
- 👤 **Profile Management** — Update your first name, last name, and profile avatar
- 💬 **Real-time Messaging** — Send and receive messages instantly via Socket.IO
- 🖼️ **Image Sharing** — Attach images to messages (uploaded to Supabase Storage)
- 🟢 **Online Presence** — See which users are currently online
- 📜 **Paginated Message History** — Cursor-based pagination loads older messages on scroll
- 📋 **Contact List** — View users you've previously chatted with

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| Socket.IO | Real-time bidirectional communication |
| PostgreSQL (via `pg`) | Primary database |
| Supabase | PostgreSQL hosting + file storage |
| JWT + bcryptjs | Authentication & password hashing |
| Multer | Multipart file upload handling |
| cookie-parser | HTTP-only cookie management |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Zustand | Global state management |
| Socket.IO Client | Real-time connection |
| Axios | HTTP requests |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling |
| React Toastify | Toast notifications |

---

## 📁 Project Structure

```
web-chat-app/
├── backend/
│   ├── controllers/        # Route handler logic
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── db/
│   │   ├── db.js           # PostgreSQL connection pool
│   │   └── migrations/     # SQL schema files
│   ├── lib/
│   │   ├── env.js          # Environment variable loader
│   │   ├── socket.js       # Socket.IO server setup
│   │   └── supabase.js     # Supabase client
│   ├── middlewares/
│   │   ├── auth.middleware.js         # JWT route protection
│   │   ├── auth.validation.js         # Request body validation
│   │   ├── multer.middleware.js        # File upload config
│   │   └── socket.auth.middleware.js  # Socket.IO auth
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── message.route.js
│   ├── src/
│   │   └── server.js       # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── hooks/          # Custom React hooks
    │   ├── layouts/        # Page layout wrappers
    │   ├── lib/            # Axios & Socket.IO setup
    │   ├── pages/          # Route-level pages
    │   ├── stores/         # Zustand state stores
    │   ├── utils/          # Utility functions
    │   └── validators/     # Frontend form validators
    └── package.json
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Supabase](https://supabase.com/) project with:
  - A PostgreSQL database (for running migrations)
  - Two storage buckets: `user-avatars` and `message-images`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dojo-prog/web-chat-app-socketio.git
cd web-chat-app-socketio
```

### 2. Set up the database

Run the migration files against your Supabase PostgreSQL database in order:

```bash
# In your Supabase SQL editor or using psql:
backend/db/migrations/001_create_users_table.sql
backend/db/migrations/002_create_messages_table.sql
```

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
```

Fill in your `.env` file:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL=your_supabase_postgres_connection_string

AUTH_TOKEN_SECRET=your_jwt_secret_key

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

CLIENT_URL=http://localhost:5173
```

### 4. Install backend dependencies and run

```bash
npm install

# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 5. Configure the frontend

```bash
cd ../frontend
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000
```

### 6. Install frontend dependencies and run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/profile` | ✅ | Get current user profile |
| `POST` | `/signup` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Log in |
| `POST` | `/logout` | ❌ | Log out (clears cookie) |
| `PUT` | `/update-profile` | ✅ | Update name and/or avatar |

### Messages — `/api/v1/messages`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Get all users (excluding self) |
| `GET` | `/contacts` | Get users you've chatted with |
| `GET` | `/:userId` | Get latest messages with a user |
| `GET` | `/next/:userId` | Load older messages (cursor pagination) |
| `POST` | `/:userId` | Send a message (text and/or image) |

---

## 🔄 Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `getOnlineUsers` | Server → Client | Broadcasts the list of online user IDs |
| `new_message` | Server → Client | Delivers a new message to sender and receiver |

---

## 🗄️ Database Schema

```sql
-- Users
CREATE TABLE users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fname       text NOT NULL,
  lname       text NOT NULL,
  email       text NOT NULL UNIQUE,
  password    text NOT NULL,
  avatar_url  text,
  avatar_path text,
  created_at  timestamptz DEFAULT now()
);

-- Messages
CREATE TABLE messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id   uuid REFERENCES users(id) NOT NULL,
  receiver_id uuid REFERENCES users(id) NOT NULL,
  content     text,
  image_url   text,
  image_path  text,
  created_at  timestamptz DEFAULT now(),
  CONSTRAINT message_not_empty CHECK (content IS NOT NULL OR image_url IS NOT NULL)
);
```

---

## 📄 License

This project is licensed under the **ISC License**.
