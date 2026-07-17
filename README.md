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

Copy `backend/.env.example` to `backend/.env`, then set:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/skillpathai
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

Keep the local `MONGO_URI` for your computer's MongoDB database, or replace it
with your hosted MongoDB connection string before deployment. `JWT_SECRET`
signs login tokens, and passwords are stored as bcrypt hashes.

Make sure MongoDB is running before starting the backend.

Run both (in separate terminals):

```bash
npm run dev:frontend
npm run dev:backend
```
