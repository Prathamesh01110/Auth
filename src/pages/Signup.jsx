import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      ...form,
      options: { emailRedirectTo: undefined, data: {} }
    })
    if (error) { setError(error.message); setLoading(false) }
    else navigate('/dashboard')
  }

  return (
    <div className="page-center">
      <div className="card">
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <label>Email
            <input name="email" type="email" value={form.email} onChange={handle} required autoFocus />
          </label>
          <label>Password
            <input name="password" type="password" value={form.password} onChange={handle} required minLength={6} />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn full" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
        </form>
        <p className="switch">Have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}
