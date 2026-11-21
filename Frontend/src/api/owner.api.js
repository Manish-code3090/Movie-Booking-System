import {api} from './axios.js'

export const registerTheatre = async (theatre) => {
  const { data } = await api.post('/owner/theatres', theatre)
  return data
}

export const getMyTheatres = async () => {
  const { data } = await api.get('/owner/theatres')
  return data
}

export const addScreen = async ({ theatreId, screen }) => {
  const { data } = await api.post(`/owner/theatres/${theatreId}/screens`, screen)
  return data
}

export const getScreens = async (theatreId) => {
  const { data } = await api.get(`/owner/theatres/${theatreId}/screens`)
  return data
}

export const createShow = async (show) => {
  const { data } = await api.post('/owner/shows', show)
  return data
}

export const getMyShows = async ({ theatreId, date } = {}) => {
  const { data } = await api.get('/owner/shows', { params: { theatreId, date } })
  return data
}

export const cancelShow = async (showId) => {
  const { data } = await api.patch(`/owner/shows/${showId}/cancel`)
  return data
}
