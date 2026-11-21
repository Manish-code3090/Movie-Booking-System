import {api} from './axios.js'

export const getCities = async () => {
  const { data } = await api.get('/cities')
  return data
}
