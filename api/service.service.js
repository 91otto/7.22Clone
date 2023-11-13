import { createAuthInstance } from './general'
import config from '@/config/api.config'

const baseUrl = config.identity

const createService = async (service) => {
  const options = Object.assign(service)
  const path = '/service'
  return createAuthInstance(baseUrl).post(path, options)
}

const updateService = async (id, displayName) => {
  const path = `/service/${id}`
  return createAuthInstance(baseUrl).put(path, { displayName })
}

const deleteService = async (id) => {
  const path = `/service/${id}`
  return createAuthInstance(baseUrl).delete(path)
}

const getServices = async () => {
  const path = 'service'
  return createAuthInstance(baseUrl).get(path)
}

export const serviceService = {
  createService,
  updateService,
  deleteService,
  getServices
}
