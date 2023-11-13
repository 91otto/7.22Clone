import _ from 'lodash'
import notification from 'ant-design-vue/es/notification'
import axios from 'axios'
import uuid from 'uuid'
import store from '../store'
import { getToken } from 'minerva-ui-sdk'
import { ApiError } from '@/utils/error'

const okayHttpStatuses = [
  200,
  201,
  204,
  304
]

const errorParser = async (response) => {
  const { status, data } = response
  if (_.some(okayHttpStatuses, s => s === status)) {
    return response
  }
  if (status === 403) {
    notification.error({
      message: '未授权',
      description: data.errorMessage
    })
    return Promise.reject(new ApiError('Forbidden', { isHandled: true, status }))
  }
  if (status === 401) {
    const token = getToken()
    notification.error({
      message: '未认证',
      description: '身份认证已失效，即将返回登录'
    })
    if (token) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
    return Promise.reject(new ApiError('Unauthorized', { isHandled: true, status }))
  }
  if (status === 400) {
    notification.error({
      message: '错误的请求',
      description: data.errorMessage
    })
    return Promise.reject(new ApiError('Bad Request', { isHandled: true, status }))
  }
  const errorMessage = (data && data.errorMessage) ? data.errorMessage : 'Unknown Network Error'
  return Promise.reject(new ApiError(errorMessage, { isHandled: false, status }))
}

export const createInstance = (baseUrl, authenticated) => {
  const timeout = 5000000
  let headers = {}
  if (authenticated) {
    headers = {
      'x-auth-key': 'Bearer ' + getToken(),
      'x-tracking-id': uuid.v4()
    }
  }
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
