import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardNav({ title }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <span className="logo">{title}</span>
      <div className="nav-actions">
        <span className="nav-user">{user?.name}</span>
        <button type="button" onClick={handleSignOut}>Sign out</button>
      </div>
    </header>
  )
}