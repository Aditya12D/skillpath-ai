import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/api'

const initialForm = {
  topic: '',
  level: 'Beginner',
  goal: '',
  weeklyHours: '5',
  duration: '6 weeks',
  learningStyle: 'Project based',
}

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillpath_user')
    return saved ? JSON.parse(saved) : null
  })
  const [form, setForm] = useState(initialForm)
  const [roadmaps, setRoadmaps] = useState([])
  const [activeRoadmapId, setActiveRoadmapId] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  const activeRoadmap = useMemo(
    () => roadmaps.find((roadmap) => roadmap.id === activeRoadmapId) || roadmaps[0],
    [activeRoadmapId, roadmaps],
  )

  useEffect(() => {
    const token = localStorage.getItem('skillpath_token')

    if (!token) {
      navigate('/login')
      return
    }

    async function loadDashboard() {
      try {
        const [meData, roadmapData] = await Promise.all([
          apiRequest('/auth/me'),
          apiRequest('/roadmaps'),
        ])

        setUser(meData.user)
        localStorage.setItem('skillpath_user', JSON.stringify(meData.user))
        setRoadmaps(roadmapData.roadmaps)
        setActiveRoadmapId(roadmapData.roadmaps[0]?.id || '')
      } catch {
        localStorage.removeItem('skillpath_token')
        localStorage.removeItem('skillpath_user')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [navigate])

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const createRoadmap = async (event) => {
    event.preventDefault()
    setError('')
    setGenerating(true)

    try {
      const data = await apiRequest('/roadmaps', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      setRoadmaps((current) => [data.roadmap, ...current])
      setActiveRoadmapId(data.roadmap.id)
      setForm(initialForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' })
    } finally {
      localStorage.removeItem('skillpath_token')
      localStorage.removeItem('skillpath_user')
      navigate('/')
    }
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        Loading dashboard...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-black text-slate-950">
            SkillPath AI
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:inline">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[390px_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-black text-slate-950">Create roadmap</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the learning details and the backend will send them to Groq.
          </p>

          <form onSubmit={createRoadmap} className="mt-6 space-y-4">
            <Field label="Topic">
              <input
                className="form-input"
                name="topic"
                value={form.topic}
                onChange={updateField}
                placeholder="React, Data Science, UI Design"
                required
              />
            </Field>

            <Field label="Level">
              <select
                className="form-input"
                name="level"
                value={form.level}
                onChange={updateField}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </Field>

            <Field label="Goal">
              <textarea
                className="form-input min-h-24 resize-y"
                name="goal"
                value={form.goal}
                onChange={updateField}
                placeholder="I want to build portfolio projects and prepare for internships."
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Hours/week">
                <input
                  className="form-input"
                  name="weeklyHours"
                  value={form.weeklyHours}
                  onChange={updateField}
                  placeholder="5"
                />
              </Field>

              <Field label="Duration">
                <input
                  className="form-input"
                  name="duration"
                  value={form.duration}
                  onChange={updateField}
                  placeholder="6 weeks"
                />
              </Field>
            </div>

            <Field label="Learning style">
              <select
                className="form-input"
                name="learningStyle"
                value={form.learningStyle}
                onChange={updateField}
              >
                <option>Project based</option>
                <option>Video first</option>
                <option>Reading first</option>
                <option>Practice heavy</option>
              </select>
            </Field>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              className="w-full rounded-md bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={generating}
            >
              {generating ? 'Generating...' : 'Create roadmap'}
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Your roadmaps</h2>
              <p className="text-sm text-slate-500">
                Stored in backend memory while the server is running.
              </p>
            </div>

            {roadmaps.length > 1 && (
              <select
                className="form-input max-w-xs"
                value={activeRoadmap?.id || ''}
                onChange={(event) => setActiveRoadmapId(event.target.value)}
              >
                {roadmaps.map((roadmap) => (
                  <option key={roadmap.id} value={roadmap.id}>
                    {roadmap.details.topic} - {roadmap.details.level}
                  </option>
                ))}
              </select>
            )}
          </div>

          {activeRoadmap ? (
            <RoadmapView roadmapRecord={activeRoadmap} />
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-xl font-bold text-slate-950">No roadmap yet</h3>
              <p className="mt-2 text-slate-500">
                Fill the form and your generated roadmap will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

function RoadmapView({ roadmapRecord }) {
  const { details, roadmap, createdAt } = roadmapRecord

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          {details.topic} / {details.level}
        </p>
        <h3 className="mt-2 text-3xl font-black text-slate-950">
          {roadmap.title}
        </h3>
        <p className="mt-3 text-slate-600">{roadmap.summary}</p>
        <p className="mt-3 text-xs text-slate-400">
          Created {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {roadmap.milestones?.map((milestone, index) => (
          <section
            key={`${milestone.title}-${index}`}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <h4 className="text-lg font-bold text-slate-950">
                {index + 1}. {milestone.title}
              </h4>
              <span className="text-sm font-semibold text-slate-500">
                {milestone.duration}
              </span>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ListBlock title="Tasks" items={milestone.tasks} />
              <ListBlock title="Resources" items={milestone.resources} />
            </div>

            <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              <span className="font-bold">Checkpoint:</span> {milestone.checkpoint}
            </p>
          </section>
        ))}
      </div>

      {roadmap.capstone && (
        <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
          <h4 className="font-bold">Capstone</h4>
          <p className="mt-2 text-slate-200">{roadmap.capstone}</p>
        </div>
      )}
    </article>
  )
}

function ListBlock({ title, items = [] }) {
  return (
    <div>
      <h5 className="text-sm font-bold uppercase tracking-wide text-slate-500">
        {title}
      </h5>
      <ul className="mt-2 space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-slate-50 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboardPage
