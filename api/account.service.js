import { createAuthInstance } from './general'
import config from '@/config/api.config'

const baseUrl = config.identity

const getAccounts = async () => {
  const { data } = await createAuthInstance(baseUrl).get('/account')
  return data
}

const createAccount = async (account) => {
  const options = Object.assign(account)
  const { data } = await createAuthInstance(baseUrl).post('/account', options)
  return data
}

const deleteAccount = async (id) => {
  return createAuthInstance(baseUrl).delete('/account/' + id)
}

const resetAccountPassword = async (account) => {
  const options = Object.assign(account)
  return createAuthInstance(baseUrl).post('/account/reset-password', options)
}

const updateAccount = async (options) => {
  const { id } = options
  const path = `/account/${id}`
  const { data } = await createAuthInstance(baseUrl).put(path, options)
  return data
}

export const accountService = {
  getAccounts,
  createAccount,
  resetAccountPassword,
  deleteAccount,
  updateAccount
}
