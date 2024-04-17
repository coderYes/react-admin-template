import Request from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'
import localcache from '@/utils/cache'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localcache.getCache('token')

      if (token && config && config?.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor(config) {
      return config
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
})

export default request
