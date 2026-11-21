import {api} from './axios.js'

export const getMovies = async ({ city, search = '', genre = '', language = '', page = 1, limit = 20 } = {}) => {
  const { data } = await api.get('/movies', { params: { city, search, genre, language, page, limit } })
  return data
}

export const getMovie = async (movieId) => {
  const { data } = await api.get(`/movies/${movieId}`)
  return data
}
