import { Link } from 'react-router-dom'

export default function ShowTime({ show }) {
  return (
    <Link to={`/shows/${encodeURIComponent(show.id)}/seats`} className="showtime">
      <strong>{show.time}</strong>
      <small>{show.screen}</small>
    </Link>
  )
}
