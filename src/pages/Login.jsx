import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword(form)
    if (error) { setError(error.message); setLoading(false) }
    else navigate('/dashboard')
  }

  return (
    <div className="page-center">
      <div className="card">
        <h2>Sign in</h2>
        <form onSubmit={submit}>
          <label>Email
            <input name="email" type="email" value={form.email} onChange={handle} required autoFocus />
          </label>
          <label>Password
            <input name="password" type="password" value={form.password} onChange={handle} required />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn full" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="switch">No account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}
