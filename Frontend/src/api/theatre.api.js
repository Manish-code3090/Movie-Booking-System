import api from './axios.js'

export const getTheatres = async ({ city } = {}) => {
  const { data } = await api.get('/theatres', { params: { city } })
  return data
}

export const getTheatre = async (theatreId) => {
  const { data } = await api.get(`/theatres/${theatreId}`)
  return data
}

export const getShows = async ({ movieId, city, date }) => {
  const { data } = await api.get(`/movies/${movieId}/shows`, { params: { city, date } })
  return data
}

export const getShowSeats = async (showId) => {
  const { data } = await api.get(`/shows/${showId}/seats`)
  return data
}
