# SkillPath AI

Full-stack application with a React frontend and Node.js backend.

## Project Structure

```
skillpath-ai/
├── frontend/   # React + Vite UI
├── backend/    # API server
└── package.json
```

## Getting Started

Install dependencies from the root:

```bash
npm install
```

Run the frontend:

```bash
npm run dev:frontend
```

Run the backend:

```bash
npm run dev:backend
```

Copy `backend/.env.example` to `backend/.env`, then set `GROQ_API_KEY` to a
real Groq key. Keep `MONGO_URI=mongodb://127.0.0.1:27017/skillpathai` for a
local MongoDB database, or replace it with your own MongoDB connection string.

Make sure MongoDB is running before starting the backend.

Run both (in separate terminals):

```bash
npm run dev:frontend
npm run dev:backend
```
