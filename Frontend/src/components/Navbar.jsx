import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCity } from '../context/CityContext.jsx'
import { cities } from '../api/mockData.js'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { city, setCity } = useCity()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const dashboardPath = user?.role === 'owner' ? '/owner' : user?.role === 'admin' ? '/admin' : null

  return (
    <header className="navbar">
      <Link to="/" className="logo">Reel Seat</Link>
      <select value={city} onChange={(event) => setCity(event.target.value)} aria-label="City">
        {cities.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <nav className="nav-actions">
        {user && user.role === 'customer' && <Link to="/bookings">My bookings</Link>}
        {dashboardPath && <Link to={dashboardPath}>Dashboard</Link>}
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button type="button" onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <Link to="/login" className="nav-login">Log in</Link>
        )}
      </nav>
    </header>
  )
}
