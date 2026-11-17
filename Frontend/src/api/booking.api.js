import api from './axios.js'

export const lockSeats = async ({ showId, seats }) => {
  const { data } = await api.post(`/shows/${showId}/lock`, { seats })
  return data
}

export const releaseSeats = async ({ showId, seats }) => {
  const { data } = await api.post(`/shows/${showId}/unlock`, { seats })
  return data
}

export const createBooking = async ({ showId, seats, paymentMethod }) => {
  try {
    const { data } = await api.post('/bookings', { showId, seats, paymentMethod })
    return data
  } catch (error) {
    if (error.response?.status === 409) {
      const conflict = new Error(error.response.data?.message || 'Seats no longer available')
      conflict.code = 'SEAT_CONFLICT'
      throw conflict
    }
    throw error
  }
}

export const getMyBookings = async ({ status } = {}) => {
  const { data } = await api.get('/bookings/me', { params: { status } })
  return data
}

export const getBooking = async (bookingId) => {
  const { data } = await api.get(`/bookings/${bookingId}`)
  return data
}

export const cancelBooking = async (bookingId) => {
  const { data } = await api.patch(`/bookings/${bookingId}/cancel`)
  return data
}
