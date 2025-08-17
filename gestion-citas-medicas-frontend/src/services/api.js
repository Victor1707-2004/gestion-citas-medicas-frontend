import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/'
})

// Helpers genéricos CRUD
const resource = (name) => ({
  list: (params) => api.get(`${name}/`, { params }).then(r => r.data),
  retrieve: (id) => api.get(`${name}/${id}/`).then(r => r.data),
  create: (data) => api.post(`${name}/`, data).then(r => r.data),
  update: (id, data) => api.put(`${name}/${id}/`, data).then(r => r.data),
  partialUpdate: (id, data) => api.patch(`${name}/${id}/`, data).then(r => r.data),
  destroy: (id) => api.delete(`${name}/${id}/`).then(r => r.data)
})

export const Pacientes = resource('pacientes')
export const Medicos = resource('medicos')
export const Citas = resource('citas')
export const Consultas = resource('consultas')

export default api
