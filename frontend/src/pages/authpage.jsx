import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/api'

function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password }
      const data = await apiRequest(`/auth/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      localStorage.setItem('skillpath_token', data.token)
      localStorage.setItem('skillpath_user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 md:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <Link to="/" className="text-sm font-semibold text-blue-700">
            SkillPath AI
          </Link>
          <div className="max-w-2xl space-y-5">
            <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Build roadmaps that adapt to the learner.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              Sign in to generate structured learning plans with topic, level,
              goal, time, and style stored in app memory for the current server
              session.
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-950">
              {isRegister ? 'Create account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isRegister
                ? 'Register once and start creating roadmaps.'
                : 'Log in to return to your saved roadmaps.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Aditya Sharma"
                  required
                />
              </label>
            )}

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                type="password"
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Choose a password"
                required
              />
            </label>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              className="w-full rounded-md bg-blue-700 px-4 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={loading}
            >
              {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            {isRegister ? 'Already registered?' : 'New here?'}{' '}
            <Link
              to={isRegister ? '/login' : '/register'}
              className="font-semibold text-blue-700"
            >
              {isRegister ? 'Login' : 'Create an account'}
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default AuthPage
