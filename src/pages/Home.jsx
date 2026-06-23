import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="page-center">
      <div className="hero">
        <span className="eyebrow">Simple. Secure. Fast.</span>
        <h1>Your product,<br />your users.</h1>
        <p>A clean foundation for auth-protected apps.<br />Sign up free, no credit card needed.</p>
        <div className="btn-row">
          {user ? (
            <Link className="btn" to="/dashboard">Go to Dashboard →</Link>
          ) : (
            <>
              <Link className="btn" to="/signup">Get started</Link>
              <Link className="btn btn-ghost" to="/login">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
