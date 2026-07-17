import mongoose from 'mongoose'

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

const Roadmap = mongoose.model('Roadmap', roadmapSchema)

export default Roadmap
