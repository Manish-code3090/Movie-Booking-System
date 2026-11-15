import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    setBusy(true)
    setError('')
    try {
      const user = await signIn({ email, password })
      const fallback = user.role === 'owner' ? '/owner' : user.role === 'admin' ? '/admin' : '/'
      navigate(location.state?.from || fallback, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-card">
      <h1>Log in</h1>
      <label>
        Email
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
      </label>
      {error && <p className="status-box error" role="alert">{error}</p>}
      <button type="button" className="primary" disabled={busy} onClick={submit}>{busy ? 'Logging in…' : 'Log in'}</button>
      <p className="hint">Mock mode: any email works. Use an email containing "owner" or "admin" to test those roles.</p>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </div>
  )
}
