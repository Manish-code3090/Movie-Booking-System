import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../api/movie.api.js'
import { getShows } from '../api/theatre.api.js'
import { useCity } from '../context/CityContext.jsx'
import TheatreCard from '../components/TheatreCard.jsx'
import Status from '../components/Status.jsx'

const toDateKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

const buildDates = () =>
  Array.from({ length: 5 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return {
      key: toDateKey(date),
      day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      label: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    }
  })

export default function MovieDetails() {
  const { movieId } = useParams()
  const { city } = useCity()
  const [dates] = useState(buildDates)
  const [date, setDate] = useState(dates[0].key)
  const [movie, setMovie] = useState(null)
  const [movieError, setMovieError] = useState('')
  const [groups, setGroups] = useState([])
  const [showsLoading, setShowsLoading] = useState(true)
  const [showsError, setShowsError] = useState('')

  useEffect(() => {
    let active = true
    setMovieError('')
    getMovie(movieId)
      .then((data) => {
        if (active) setMovie(data)
      })
      .catch((err) => {
        if (active) setMovieError(err.message || 'Could not load movie')
      })
    return () => {
      active = false
    }
  }, [movieId])

  useEffect(() => {
    let active = true
    setShowsLoading(true)
    setShowsError('')
    getShows({ movieId, city, date })
      .then((data) => {
        if (active) setGroups(data)
      })
      .catch((err) => {
        if (active) setShowsError(err.message || 'Could not load shows')
      })
      .finally(() => {
        if (active) setShowsLoading(false)
      })
    return () => {
      active = false
    }
  }, [movieId, city, date])

  return (
    <div className="movie-details">
      <Status loading={!movie && !movieError} error={movieError}>
        {movie && (
          <section className="movie-info">
            <div className="poster" style={{ background: `linear-gradient(160deg, hsl(${movie.hue}, 70%, 45%), hsl(${movie.hue + 30}, 60%, 14%))` }}>
              <span>{movie.title}</span>
            </div>
            <div className="movie-text">
              <h1>{movie.title}</h1>
              <p className="meta">{movie.genres.join(', ')} · {movie.language} · {movie.duration} min · {movie.rating.toFixed(1)} / 10</p>
              <p>{movie.description}</p>
              <p className="cast">Cast: {movie.cast.join(', ')}</p>
            </div>
          </section>
        )}
      </Status>
      <section className="shows">
        <h2>Shows in {city}</h2>
        <div className="date-strip">
          {dates.map((item) => (
            <button key={item.key} type="button" className={item.key === date ? 'active' : ''} onClick={() => setDate(item.key)}>
              <span>{item.day}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
        <Status loading={showsLoading} error={showsError} empty={!groups.length} emptyText={`No theatres are showing this movie in ${city} on this date. Try another date or city.`}>
          <div className="theatre-list">
            {groups.map((group) => (
              <TheatreCard key={group.theatre.id} theatre={group.theatre} shows={group.shows} />
            ))}
          </div>
        </Status>
      </section>
    </div>
  )
}
