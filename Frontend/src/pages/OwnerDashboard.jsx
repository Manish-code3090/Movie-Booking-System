export default function OwnerDashboard() {
  return (
    <div className="dashboard">
      <h1>Theatre owner dashboard</h1>
      <div className="dashboard-grid">
        <section>
          <h3>Theatres</h3>
          <p>Register a theatre and wait for admin verification.</p>
        </section>
        <section>
          <h3>Screens</h3>
          <p>Define screen layouts and seat categories.</p>
        </section>
        <section>
          <h3>Shows</h3>
          <p>Schedule shows with date, time and pricing.</p>
        </section>
      </div>
    </div>
  )
}
