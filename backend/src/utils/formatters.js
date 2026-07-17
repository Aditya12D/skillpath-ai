export function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt?.toISOString(),
  }
}

export function formatRoadmap(roadmap) {
  return {
    id: roadmap._id.toString(),
    userId: roadmap.userId.toString(),
    details: roadmap.details,
    roadmap: roadmap.roadmap,
    createdAt: roadmap.createdAt?.toISOString(),
  }
}
