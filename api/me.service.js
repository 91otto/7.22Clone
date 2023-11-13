import { createAuthInstance } from './general'
import config from '@/config/api.config'
import qs from 'qs'

const baseUrl = config.identity

const getInfo = async () => {
  const path = '/me/info'
  const { data } = await createAuthInstance(baseUrl).get(path)
  return data
}

const getAcl = async (options) => {
  const query = qs.stringify({ serviceName: options.serviceName })
  const path = `/me/acl?${query}`
  const { data } = await createAuthInstance(baseUrl).get(path)
  return data
}

const getGroups = async () => {
  const path = '/me/groups'
  const { data } = await createAuthInstance(baseUrl).get(path)
  return data
}

const changePassword = async (password) => {
  const options = Object.assign(password)
  const path = '/me/password'
  return createAuthInstance(baseUrl).put(path, options)
}

const changeDisplayName = async (displayName) => {
  const path = '/me/change'
  return createAuthInstance(baseUrl).put(path, { displayName })
}

const getMyTenant = async () => {
  const path = '/me/tenant'
  return createAuthInstance(baseUrl).get(path)
}

export const meService = {
  changePassword,
  changeDisplayName,
  getInfo,
  getAcl,
  getGroups,
  getMyTenant
}
