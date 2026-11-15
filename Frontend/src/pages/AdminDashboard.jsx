export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Admin dashboard</h1>
      <div className="dashboard-grid">
        <section>
          <h3>Theatre owner verification</h3>
          <p>Review pending owner registrations.</p>
        </section>
        <section>
          <h3>Movies</h3>
          <p>Add, edit and retire movie listings.</p>
        </section>
        <section>
          <h3>Users</h3>
          <p>View and manage customer and owner accounts.</p>
        </section>
      </div>
    </div>
  )
}
