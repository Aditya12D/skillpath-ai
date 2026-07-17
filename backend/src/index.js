import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import crypto from 'crypto'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillpathai'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

const sessionSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

const roadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    details: {
      topic: String,
      level: String,
      goal: String,
      weeklyHours: String,
      duration: String,
      learningStyle: String,
    },
    roadmap: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)
const Session = mongoose.model('Session', sessionSchema)
const Roadmap = mongoose.model('Roadmap', roadmapSchema)

app.use(cors({
  origin: process.env.FRONTEND_URL
}))
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  const [users, sessions, roadmaps] = await Promise.all([
    User.countDocuments(),
    Session.countDocuments(),
    Roadmap.countDocuments(),
  ])

  res.json({
    status: 'ok',
    message: 'SkillPath AI backend is running',
    database: {
      connected: mongoose.connection.readyState === 1,
      users,
      sessions,
      roadmaps,
    },
  })
})

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' })
  }

  const normalizedEmail = email.trim().toLowerCase()

  const existingUser = await User.findOne({ email: normalizedEmail })

  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' })
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  })

  const session = await createSession(user)

  res.status(201).json(session)
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() })

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  res.json(await createSession(user))
})

app.post('/api/auth/logout', authenticate, async (req, res) => {
  await Session.deleteOne({ token: req.token })
  res.json({ message: 'Logged out successfully.' })
})

app.get('/api/me', authenticate, (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})

app.get('/api/roadmaps', authenticate, async (req, res) => {
  const userRoadmaps = await Roadmap.find({ userId: req.user._id }).sort({ createdAt: -1 })

  res.json({ roadmaps: userRoadmaps.map(formatRoadmap) })
})

app.post('/api/roadmaps', authenticate, async (req, res) => {
  const details = normalizeRoadmapDetails(req.body)

  if (!details.topic || !details.level || !details.goal) {
    return res.status(400).json({ message: 'Topic, level, and goal are required.' })
  }

  try {
    const generated = await generateRoadmap(details)
    const roadmap = await Roadmap.create({
      userId: req.user._id,
      details,
      roadmap: generated,
    })

    res.status(201).json({ roadmap: formatRoadmap(roadmap) })
  } catch (error) {
    console.error('Roadmap generation failed:', error)
    res.status(502).json({ message: getPublicGenerationError(error) })
  }
})

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`MongoDB connected at ${MONGO_URI}`)
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })

async function createSession(user) {
  const token = crypto.randomUUID()
  await Session.create({ token, userId: user._id })

  return {
    token,
    user: sanitizeUser(user),
  }
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt?.toISOString(),
  }
}

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  const session = token ? await Session.findOne({ token }).populate('userId') : null
  const user = session?.userId

  if (!token || !user) {
    return res.status(401).json({ message: 'You must be logged in to continue.' })
  }

  req.token = token
  req.user = user
  next()
}

function normalizeRoadmapDetails(body) {
  return {
    topic: String(body.topic || '').trim(),
    level: String(body.level || '').trim(),
    goal: String(body.goal || '').trim(),
    weeklyHours: String(body.weeklyHours || '').trim(),
    duration: String(body.duration || '').trim(),
    learningStyle: String(body.learningStyle || '').trim(),
  }
}

async function generateRoadmap(details) {
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes('your_')) {
    throw new Error('GROQ_API_KEY is missing. Add a valid key in backend/.env and restart the backend.')
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You create concise learning roadmaps. Return only valid JSON matching this shape: {"title": string, "summary": string, "milestones": [{"title": string, "duration": string, "tasks": string[], "resources": string[], "checkpoint": string}], "capstone": string}.',
        },
        {
          role: 'user',
          content: JSON.stringify(details),
        },
      ],
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Groq API error ${response.status}: ${message}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('Groq response did not include roadmap content.')
  }

  return JSON.parse(content)
}

function getPublicGenerationError(error) {
  const message = error instanceof Error ? error.message : ''

  if (message.includes('invalid_api_key') || message.includes('401')) {
    return 'Groq rejected the API key. Check backend/.env, replace GROQ_API_KEY with a valid key, and restart the backend.'
  }

  if (message.includes('GROQ_API_KEY is missing')) {
    return message
  }

  return 'Unable to generate roadmap right now.'
}

function formatRoadmap(roadmap) {
  return {
    id: roadmap._id.toString(),
    userId: roadmap.userId.toString(),
    details: roadmap.details,
    roadmap: roadmap.roadmap,
    createdAt: roadmap.createdAt?.toISOString(),
  }
}
