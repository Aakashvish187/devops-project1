# LACSO HUB — MERN Stack

> AI-Powered Digital Growth Ecosystem  
> React + Node.js + Express + MongoDB

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- npm or yarn

### 1. Clone / Navigate
```bash
cd c:\lacsohub\lacsohub-mern
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env → add your MONGO_URI (MongoDB Atlas connection string)
npm install
npm run seed    # Seeds all data (blogs, services, portfolio, team, etc.)
npm run dev     # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev     # Starts on http://localhost:5173
```

---

## 🔑 Admin Login (after seeding)
- **URL:** http://localhost:5173/admin/login
- **Username:** `boathead`
- **Password:** `Admin@1234`

---

## 📁 Project Structure

```
lacsohub-mern/
├── backend/
│   ├── src/
│   │   ├── config/       # DB, Cloudinary config
│   │   ├── controllers/  # Business logic
│   │   ├── middleware/   # Auth, error handling
│   │   ├── models/       # Mongoose schemas
│   │   └── routes/       # API routes
│   ├── server.js         # Entry point
│   ├── seed.js           # Database seeder
│   └── .env              # Environment variables
└── frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Public + Admin pages
    │   ├── services/     # Axios API client
    │   └── store/        # Zustand state
    ├── index.html
    └── .env              # VITE_API_URL
```

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| POST | /api/auth/refresh | Cookie | Refresh JWT |
| GET | /api/blogs | No | List blogs |
| GET | /api/blogs/:slug | No | Single blog |
| POST | /api/blogs | Admin | Create blog |
| GET | /api/services | No | List services |
| GET | /api/portfolio | No | List portfolio |
| GET | /api/team | No | List team |
| GET | /api/testimonials | No | List testimonials |
| GET | /api/pricing | No | List pricing plans |
| POST | /api/contact | No | Submit contact form |
| GET | /api/contact | Admin | View submissions |
| POST | /api/ai/chat | No | AI chatbot |
| GET | /api/settings | No | Site settings |
| PUT | /api/settings | Admin | Update settings |

---

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://...  # Required
JWT_SECRET=...               # Required (min 32 chars)
JWT_REFRESH_SECRET=...       # Required (min 32 chars)
EMAIL_USER=...               # Optional (Gmail for notifications)
EMAIL_PASS=...               # Optional (Gmail App Password)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✨ Features
- 🤖 AI Chatbot with Knowledge Base RAG
- 📝 Full Blog CMS (CRUD)
- 💼 Portfolio case studies
- 👥 Team management
- 💬 Contact form with email notifications
- 💰 Dynamic pricing plans
- 🔐 JWT auth with refresh tokens
- 📊 Admin dashboard
- 🌙 Ultra-premium dark theme
- 📱 Mobile-first responsive design
