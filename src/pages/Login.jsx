// ─── Login.jsx ─────────────────────────────────────────────────
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import { signIn } from '../auth'
import {supabase} from '../supabase.js'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async () => {
    try {
      await supabase.auth.signInWithPassword({email, password})
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="page-center">
      <div className="card">
        <h2>Sign in</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button className="btn full" onClick={submit}>Sign in</button>
        <p className="switch">No account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}