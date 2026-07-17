import express from 'express'
import User from '../models/User.js'
import authenticate from '../middleware/auth.js'
import { sanitizeUser } from '../utils/formatters.js'
import { hashPassword, isValidPassword } from '../utils/passwords.js'
import { createToken } from '../utils/tokens.js'

const router = express.Router()

router.post('/register', async (req, res) => {
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
    password: await hashPassword(password),
  })

  res.status(201).json(createSessionResponse(user))
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() })
  const passwordMatches = user ? await isValidPassword(user, password) : false

  if (!user || !passwordMatches) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  res.json(createSessionResponse(user))
})

router.post('/logout', authenticate, (_req, res) => {
  res.json({ message: 'Logged out successfully.' })
})

router.get('/me', authenticate, (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
})

function createSessionResponse(user) {
  return {
    token: createToken(user),
    user: sanitizeUser(user),
  }
}

export default router
