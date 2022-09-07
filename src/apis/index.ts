import axios from 'axios'

import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import { ElLoading, ElMessage } from 'element-plus'
const baseURL = import.meta.env.VITE_APP_BASE_URL
let loadingInstance: LoadingInstance

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
    if (config.loading)
      loadingInstance = ElLoading.service({ fullscreen: true })
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
      loadingInstance.close()

    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 关闭 loading
    if (error.config.loading)
      loadingInstance.close()

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

    ElMessage.error(error.message)

    return Promise.reject(error)
  },
)

export default axiosInstance

export function post<T>(url: string, data: object, loading = true) {
  return axiosInstance.request<unknown, T>({
    method: 'post',
    url,
    data,
    loading,
  })
}
