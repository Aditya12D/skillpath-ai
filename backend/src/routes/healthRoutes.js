import express from 'express'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Roadmap from '../models/Roadmap.js'

const router = express.Router()

router.get('/health', async (_req, res) => {
  const [users, roadmaps] = await Promise.all([
    User.countDocuments(),
    Roadmap.countDocuments(),
  ])

  res.json({
    status: 'ok',
    message: 'SkillPath AI backend is running',
    database: {
      connected: mongoose.connection.readyState === 1,
      users,
      roadmaps,
    },
  })
})

export default router
