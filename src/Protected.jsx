import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from './supabase'

export default function Protected({ children }) {
  const [user, setUser] = useState(undefined)

// ✅ Option 1 — use .then() (what we're using)
useEffect(() => {
  supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
}, [])

// ✅ Option 2 — define async inside, then call it
useEffect(() => {
  const check = async () => {
    const { data } = await supabase.auth.getSession()
    setUser(data.session?.user ?? null)
  }
  check()
}, [])

  if (user === undefined) return <p>Loading…</p>
  if (!user) return <Navigate to="/login" replace />
  return children
}