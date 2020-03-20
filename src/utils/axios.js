import axios from 'axios'
import {getAuthUrl} from './'

const makeFormData = (params) => {
  const form = new window.FormData()
  for (const key of Object.keys(params)) {
    form.append(key, params[key])
  }
  return form
}

axios.interceptors.request.use((config) => {
  config.headers['x-user-client'] = 'WECHAT'

  const token = localStorage.getItem('TOKEN')
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`
  }

  if (config.contentType === 'form-data') {
    config.data = makeFormData(config.data)
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  const token = res.headers['x-user-token']
  if (token) {
    localStorage.setItem('TOKEN', token)
  }
  return res.data
}, (error) => {
  // 未授权错误，直接跳转授权登陆页面
  if (error.response && error.response.status.toString() === '401') {
    const authUrl = getAuthUrl()
    localStorage.removeItem('TOKEN')
    localStorage.setItem('redirectUrl', window.location.href)
    window.location.href = authUrl
  }

  // 错误静默处理，通过判断payload来判断数据结果
  if (error.response.data && error.response.data.error) {
    return Promise.reject(error.response.data.error)
  } else if (error.response) {
    return Promise.reject(`${error.response.status}:${error.response.statusText}`)
  } else {
    return Promise.reject('服务处理异常')
  }
})

export default axios
