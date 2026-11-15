import { Outlet } from 'react-router-dom'
import DashboardNav from '../components/DashboardNav.jsx'

export default function OwnerLayout() {
  return (
    <div className="app-shell">
      <DashboardNav title="Theatre owner" />
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}
