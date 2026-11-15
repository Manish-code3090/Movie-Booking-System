import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const submit = async () => {
    setBusy(true)
    setError('')
    try {
      const user = await signUp(form)
      navigate(user.role === 'owner' ? '/owner' : '/', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-card">
      <h1>Create account</h1>
      <label>
        Name
        <input type="text" value={form.name} onChange={update('name')} autoComplete="name" />
      </label>
      <label>
        Email
        <input type="email" value={form.email} onChange={update('email')} autoComplete="email" />
      </label>
      <label>
        Password
        <input type="password" value={form.password} onChange={update('password')} autoComplete="new-password" />
      </label>
      <label>
        Account type
        <select value={form.role} onChange={update('role')}>
          <option value="customer">Customer</option>
          <option value="owner">Theatre owner</option>
        </select>
      </label>
      {error && <p className="status-box error" role="alert">{error}</p>}
      <button type="button" className="primary" disabled={busy} onClick={submit}>{busy ? 'Creating…' : 'Create account'}</button>
      <p>Already registered? <Link to="/login">Log in</Link></p>
    </div>
  )
}
