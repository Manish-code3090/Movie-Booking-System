import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

export default function CustomerLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
