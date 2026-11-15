import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="poster" style={{ background: `linear-gradient(160deg, hsl(${movie.hue}, 70%, 45%), hsl(${movie.hue + 30}, 60%, 14%))` }}>
        <span>{movie.title}</span>
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.genres.join(', ')} · {movie.language}</p>
      <p className="rating">{movie.rating.toFixed(1)} / 10</p>
    </Link>
  )
}
