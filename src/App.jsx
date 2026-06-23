import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Protected from './Protected'

// Public pages
import Home    from './pages/Home'
import Login   from './pages/Login'
import Signup  from './pages/Signup'

// Auth-protected pages
import Dashboard from './pages/Dashboard'

// Tools (all protected)
import AI     from './pages/tools/AI'

const P = ({ children }) => <Protected>{children}</Protected>

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/signup"   element={<Signup />} />
          <Route path="/dashboard"      element={<P><Dashboard /></P>} />
          <Route path="/tools/ai"       element={<P><AI /></P>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
