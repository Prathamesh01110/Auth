import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function Protected({ children }) {
  const { user } = useAuth()
  if (user === undefined) return <div className="page-center"><span className="muted">Loading…</span></div>
  if (!user) return <Navigate to="/login" replace />
  return children
}
