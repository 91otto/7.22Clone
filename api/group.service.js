
import { createAuthInstance } from './general'
import config from '@/config/api.config'

const baseUrl = config.identity

const getGroupList = async () => {
  const path = `/group`
  const { data } = await createAuthInstance(baseUrl).get(path)
  return data
}

const createGroup = async (options) => {
  const path = `/group`
  const { data } = await createAuthInstance(baseUrl).post(path, options)
  return data
}

const updateGroup = async (options) => {
  const { id } = options
  const path = `/group/${id}`
  const { data } = await createAuthInstance(baseUrl).put(path, options)
  return data
}

const createSubGroup = async (options) => {
  const path = '/group/add/sub'
  const { data } = await createAuthInstance(baseUrl).post(path, options)
  return data
}

const fetchGroupForDetail = async (id) => {
  const path = `/group/${id}`
  const { data } = await createAuthInstance(baseUrl).get(path)
  return data
}

const addGroupMember = async (options) => {
  const path = `/group/add/membership`
  const { data } = await createAuthInstance(baseUrl).post(path, options)
  return data
}

const removeGroupMember = async (options) => {
  const path = '/group/remove/membership'
  const { data } = await createAuthInstance(baseUrl).post(path, options)
  return data
}

const changeGroupOwner = async (options) => {
  const path = '/group/change/owner'
  const { data } = await createAuthInstance(baseUrl).post(path, options)
  return data
}
export const groupService = {
  getGroupList,
  createGroup,
  updateGroup,
  createSubGroup,
  fetchGroupForDetail,
  addGroupMember,
  removeGroupMember,
  changeGroupOwner
}
