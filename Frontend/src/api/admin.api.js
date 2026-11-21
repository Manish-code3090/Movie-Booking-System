import {api} from './axios.js'

export const getPendingOwners = async () => {
  const { data } = await api.get('/admin/owners', { params: { status: 'pending' } })
  return data
}

export const verifyOwner = async (ownerId) => {
  const { data } = await api.patch(`/admin/owners/${ownerId}/verify`)
  return data
}

export const rejectOwner = async ({ ownerId, reason }) => {
  const { data } = await api.patch(`/admin/owners/${ownerId}/reject`, { reason })
  return data
}

export const addMovie = async (movie) => {
  const { data } = await api.post('/admin/movies', movie)
  return data
}

export const updateMovie = async ({ movieId, changes }) => {
  const { data } = await api.put(`/admin/movies/${movieId}`, changes)
  return data
}

export const deleteMovie = async (movieId) => {
  await api.delete(`/admin/movies/${movieId}`)
}

export const getUsers = async ({ role, page = 1, limit = 20 } = {}) => {
  const { data } = await api.get('/admin/users', { params: { role, page, limit } })
  return data
}

export const setUserStatus = async ({ userId, active }) => {
  const { data } = await api.patch(`/admin/users/${userId}/status`, { active })
  return data
}
