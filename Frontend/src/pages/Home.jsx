import { useEffect, useState } from 'react'
import { getMovies } from '../api/movie.api.js'
import { useCity } from '../context/CityContext.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Status from '../components/Status.jsx'

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Family', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']
const languages = ['Hindi', 'English', 'Tamil']

export default function Home() {
  const { city } = useCity()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [language, setLanguage] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    getMovies({ city, search, genre, language })
      .then((data) => {
        if (active) setMovies(data)
      })
      .catch((err) => {
        if (active) setError(err.message || 'Could not load movies')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [city, search, genre, language])

  return (
    <div className="home">
      <section className="hero">
        <h1>Now showing in {city}</h1>
        <p>Pick a film, choose a show and reserve your seats.</p>
      </section>
      <div className="filters">
        <input type="search" placeholder="Search movies" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search movies" />
        <select value={genre} onChange={(event) => setGenre(event.target.value)} aria-label="Genre">
          <option value="">All genres</option>
          {genres.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
          <option value="">All languages</option>
          {languages.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <Status loading={loading} error={error} empty={!movies.length} emptyText="No movies match these filters. Clear a filter to see more.">
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </Status>
    </div>
  )
}
