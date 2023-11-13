import { createAuthInstance } from './general'
import config from '@/config/api.config'
import qs from 'qs'

const baseUrl = config.identity

const getTenants = async () => {
  return createAuthInstance(baseUrl).get('/tenant')
}

const getTenant = async (id) => {
  const path = `/tenant/${id}`
  return createAuthInstance(baseUrl).get(path)
}

const getTenantContacts = async (id) => {
  const query = qs.stringify({ tenantId: id })
  const path = `/tenant-contact?${query}`
  return createAuthInstance(baseUrl).get(path)
}

const getTenantFiles = async (id) => {
  const query = qs.stringify({ tenantId: id })
  const path = `/tenant-file?${query}`
  return createAuthInstance(baseUrl).get(path)
}

const getTenantServices = async (id) => {
  const query = qs.stringify({ tenantId: id })
  const path = `/tenantservice?${query}`
  return createAuthInstance(baseUrl).get(path)
}

const addTenantService = async (service) => {
  const options = Object.assign(service)
  return createAuthInstance(baseUrl).post('/tenantservice', options)
}

const disableOrEnableTenantService = async (service) => {
  const path = `/tenantservice/${service.id}`
  return createAuthInstance(baseUrl).put(path, { isEnable: service.isEnable })
}

const registerTenant = async (tenant) => {
  const options = Object.assign(tenant)
  return createAuthInstance(baseUrl).post('/tenant', options)
}

const activateTenant = async (tenant) => {
  const options = Object.assign(tenant)
  return createAuthInstance(baseUrl).post('/tenant/activate', options)
}

export const tenantService = {
  getTenants,
  getTenant,
  getTenantContacts,
  getTenantFiles,
  getTenantServices,
  registerTenant,
  activateTenant,
  addTenantService,
  disableOrEnableTenantService
}
