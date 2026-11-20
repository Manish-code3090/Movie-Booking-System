export default function Status({ loading, error, empty, emptyText = 'Nothing to show yet', children }) {
  if (loading) return <p className="status-box">Loading…</p>
  if (error) return <p className="status-box error" role="alert">{error}</p>
  if (empty) return <p className="status-box">{emptyText}</p>
  return children
}