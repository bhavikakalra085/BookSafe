import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { Accept: 'application/json' },
})

export const getSeats = async () => (await api.get('/seats')).data
export const bookSeat = async (id) => (await api.post(`/seats/${id}/book`)).data
export const cancelSeat = async (id) => (await api.post(`/seats/${id}/cancel`)).data

export default api
