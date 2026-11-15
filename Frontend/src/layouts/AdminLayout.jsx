import { Outlet } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav.jsx'

export default function AdminLayout() {
  return (
    <div className="app-shell">
      <DashboardNav title="Admin" />
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
