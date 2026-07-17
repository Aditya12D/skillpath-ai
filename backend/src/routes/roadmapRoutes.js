import express from 'express'
import Roadmap from '../models/Roadmap.js'
import authenticate from '../middleware/auth.js'
import { formatRoadmap } from '../utils/formatters.js'
import { generateRoadmap, getPublicGenerationError } from '../services/groqService.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  const userRoadmaps = await Roadmap.find({ userId: req.user._id }).sort({ createdAt: -1 })

  res.json({ roadmaps: userRoadmaps.map(formatRoadmap) })
})

router.post('/', authenticate, async (req, res) => {
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

export default router
