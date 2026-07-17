const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'

export async function generateRoadmap(details) {
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

export function getPublicGenerationError(error) {
  const message = error instanceof Error ? error.message : ''

  if (message.includes('invalid_api_key') || message.includes('401')) {
    return 'Groq rejected the API key. Check backend/.env, replace GROQ_API_KEY with a valid key, and restart the backend.'
  }

  if (message.includes('GROQ_API_KEY is missing')) {
    return message
  }

  return 'Unable to generate roadmap right now.'
}
