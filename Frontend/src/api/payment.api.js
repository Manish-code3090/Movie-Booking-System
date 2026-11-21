import {api} from './axios.js'

export const createPaymentIntent = async ({ bookingId, method }) => {
  const { data } = await api.post('/payments/intent', { bookingId, method })
  return data
}

export const verifyPayment = async ({ paymentId, signature }) => {
  const { data } = await api.post('/payments/verify', { paymentId, signature })
  return data
}
