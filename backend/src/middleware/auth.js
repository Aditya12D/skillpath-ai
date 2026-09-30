import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error("JWT Secret variable is required")

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'You must be logged in to continue.' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(payload.userId)

    if (!user) {
      return res.status(401).json({ message: 'Invalid session.' })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Session expired. Please log in again.' })
  }
}

export default authenticate
