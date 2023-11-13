import message from 'ant-design-vue/es/message'
import axios from 'axios'

import { getToken } from 'minerva-ui-sdk'

const errorParser = (response) => {
  let error = null
  if (response.status < 300) {
    return response
  } else if (response.status === 401) {
    const token = getToken()
    error = new Error('身份认证已失效，即将返回登录')
    if (token) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
    }
  } else if (response.data && response.data.errorMessage) {
    error = new Error(response.data.errorMessage)
  }
  message.error(error.message)
  return Promise.reject(error)
}

export const createInstance = (baseUrl, authenticated) => {
  const timeout = 5000000
  const headers = {}
  if (authenticated) { headers['x-auth-key'] = 'Bearer ' + getToken() }
  const instance = axios.create({
    baseURL: baseUrl,
    timeout,
    headers,
    validateStatus: () => true
  })
  instance.interceptors.response.use(errorParser)
  return instance
}

export const createAuthInstance = (baseUrl) => createInstance(baseUrl, true)

export const createWorkspaceInstance = (baseUrl) => {
  const instance = createAuthInstance(baseUrl)
  instance.interceptors.request.use(request => {
    request.params = request.params || {}
    // request.params.workspaceId = store.getters.workspace.id
    return request
  })
  return instance
}
