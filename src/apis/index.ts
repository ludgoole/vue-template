import axios from 'axios'
import { Toast } from 'vant'
import type { AXIOS } from '../types/axios'
const baseURL = import.meta.env.VITE_REQUEST_BASE_URL

/**
  * 创建axios实例
  */
const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
})

/**
  * 请求拦截
  */
axiosInstance.interceptors.request.use(
  (config) => {
    // 打开 loading
    if (config.loading) {
      Toast.loading({
        message: 'loading...',
        forbidClick: true,
        duration: 0,
      })
    }

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

/**
  * 响应拦截
  */
axiosInstance.interceptors.response.use(
  (response) => {
    // 关闭 loading
    if (response.config.loading)
      Toast.clear()

    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 关闭 loading
    if (error.config.loading)
      Toast.clear()

    // 对响应错误做点什么
    switch (error.response?.status) {
      case 400:
        error.message = '请求错误(400)'
        break
      case 401:
        error.message = '未授权(401)'
        break
      case 403:
        error.message = '拒绝访问(403)'
        break
      case 404:
        error.message = '请求出错(404)'
        break
      case 408:
        error.message = '请求超时(408)'
        break
      case 500:
        error.message = '服务器错误(500)'
        break
      case 501:
        error.message = '服务未实现(501)'
        break
      case 502:
        error.message = '网络错误(502)'
        break
      case 503:
        error.message = '服务不可用(503)'
        break
      case 504:
        error.message = '网络超时(504)'
        break
      case 505:
        error.message = 'HTTP版本不受支持(505)'
        break
      default:
        error.message = `连接出错(${error.response?.status})!`
    }
    Toast.fail(error.message)

    return Promise.reject(error)
  },
)

export default axiosInstance

export function post(url: string, data: object, loading = true) {
  return axiosInstance.request<unknown, AXIOS.TypeRequestApiResult>({
    method: 'post',
    url,
    data,
    loading,
  })
}
