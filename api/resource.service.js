import { createAuthInstance } from './general'
import config from '@/config/api.config'

const baseUrl = config.identity + '/resource'
const accountRoleBaseUrl = config.identity + '/acl'

const getResourceList = async () => {
  return createAuthInstance(baseUrl).get('')
}

const fetchResourceForDetail = async (options) => {
  const { id } = options
  const { data } = await createAuthInstance(baseUrl).get('/' + id)
  return data
}

const addResourceAccounts = async (options) => {
  const { data } = await createAuthInstance(accountRoleBaseUrl).post('/add/accounts', options)
  return data
}

const addResourceGroups = async (options) => {
  const { data } = await createAuthInstance(accountRoleBaseUrl).post('/add/groups', options)
  return data
}

const bulkAddResourceGroups = async (options) => {
  const { data } = await createAuthInstance(accountRoleBaseUrl).post('/bulk-add/groups', options)
  return data
}

const removeResourceAccounts = async (options) => {
  const { data } = await createAuthInstance(accountRoleBaseUrl).post('/remove/accounts', options)
  return data
}

const removeResourceGroups = async (options) => {
  const { data } = await createAuthInstance(accountRoleBaseUrl).post('/remove/groups', options)
  return data
}

export const resourceService = {
  getResourceList,
  addResourceAccounts,
  addResourceGroups,
  bulkAddResourceGroups,
  removeResourceAccounts,
  removeResourceGroups,
  fetchResourceForDetail
}
