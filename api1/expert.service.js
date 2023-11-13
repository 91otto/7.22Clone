import {
  createAuthInstance,
  createWorkspaceInstance
} from './general'
import config from '@/config/api.config'

const baseUrl = config.expert
const intelligenceUrl = config.intelligence

/* ---------- Files ------------ */
const getFile = async (id) => {
  return createWorkspaceInstance(baseUrl).get(`files/${id}`)
}

const exportFiles = async (ids) => {
  return createWorkspaceInstance(baseUrl).post('files/excel/query', ids)
}

/* ----------- Result ----------- */
const infer = async (fileId) => {
  return createWorkspaceInstance(baseUrl).post(`files/${fileId}`)
}

/* ---------- Template -------- */
const updateTemplate = async (id, options) => {
  return createAuthInstance(baseUrl).put(`/files/${id}`, options)
}

const reloadTemplate = async (id) => {
  return createAuthInstance(baseUrl).get(`/files/${id}`)
}

const importMappingTable = async (formData) => {
  return createAuthInstance(baseUrl).post(`/import`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const searchByMappingTable = async (options) => {
  return createAuthInstance(baseUrl).post('/search', options)
}

const uploadTemplate = async (fileName) => {
  return createAuthInstance(baseUrl).post('/meta/templates', fileName)
}

const updateOcrResult = async (id, options) => {
  return createAuthInstance(baseUrl).put(`/fileOcrResults/${id}`, options)
}

const createTemplate = async (templateInfo) => {
  return createAuthInstance(baseUrl).post('/files', templateInfo)
}

const getTemplateList = async (options) => {
  const { type, value } = options
  if (type && type === 'mapping' && value) {
    const options = { batchValue: value }
    return createAuthInstance(baseUrl).post('/search', options)
  } else {
    return createAuthInstance(baseUrl).get('/files')
  }
}

const checkTemplateOcrResults = async (id, options) => {
  return createAuthInstance(baseUrl).post(`/files/checkResult/${id}`, options)
}

const downloadTemplate = async (id) => {
  return createAuthInstance(baseUrl).get(`/files/downloadFile/${id}`, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream'
    }
  })
}

const downloadTemplateBatch = async ({ filename, files }) => {
  const query = encodeURIComponent(JSON.stringify([...files]))
  return createAuthInstance(intelligenceUrl).get(`/batch/files?files=${query}&filename=${filename}`, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream'
    }
  })
}

const deleteTemplate = async (id) => {
  return createAuthInstance(baseUrl).delete(`/files/${id}`)
}

const batchMask = async (id) => {
  return createAuthInstance(baseUrl).get(`/batch-erase/${id}`)
}

export const expertService = {
  getFile,
  exportFiles,

  infer,

  updateTemplate,
  reloadTemplate,
  importMappingTable,
  searchByMappingTable,
  uploadTemplate,
  updateOcrResult,
  createTemplate,
  getTemplateList,
  checkTemplateOcrResults,
  downloadTemplate,
  deleteTemplate,
  downloadTemplateBatch,
  batchMask
}
