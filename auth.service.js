import { createInstance, createAuthInstance } from './general'

import config from '@/config/api.config'

const identityUrl = config.identity

const login = async ({ email, password }) => {
  return createInstance(identityUrl).post('token', {
    email,
    password
  }).then(res => res)
}

const getInfo = async () => {
  return createAuthInstance(identityUrl).get('me/info')
}

const registerTenant = async (tenant) => {
  const options = Object.assign(tenant)
  return createInstance(identityUrl).post('/registtenant', options)
}

const logout = async () => {
  // return axios({
  //   url: '/auth/logout',
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8'
  //   }
  // })
}

export const authService = {
  login,
  getInfo,
  registerTenant,
  logout
}
