import axios from 'axios'
import errorCode from '@/utils/errorCode'
import { deleteCache } from '@/utils/localCache'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import { message, notification, modal } from '@/components/baseNotice'

type ErrorCodeKey = keyof typeof errorCode

// 是否显示重新登录
export const isRelogin = { show: false }

class Request {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 响应拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const isToken = (config.headers || {}).isToken === false

        if (getToken() && !isToken) {
          config.headers = config.headers || {}
          config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        const codeStr = `${code}`
        // 获取错误信息
        const msg = errorCode[codeStr as ErrorCodeKey] || res.data.message || errorCode['default']
        // 二进制数据则直接返回
        if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
          return res.data
        }
        if (code === 401) {
          if (!isRelogin.show) {
            isRelogin.show = true
            modal.confirm({
              title: '系统提示',
              content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
              onOk() {
                isRelogin.show = false
                removeToken()
                deleteCache('userInfo')
                location.href = '/'
              },
              onCancel() {
                isRelogin.show = false
              }
            })
          }
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          message.error(msg)
          return Promise.reject(new Error(msg))
        } else if (code === 601) {
          message.warning(msg)
          return Promise.reject(new Error(msg))
        } else if (code !== 200) {
          notification.error({
            message: '请求失败',
            description: msg
          })
          return Promise.reject('error')
        } else {
          return Promise.resolve(res.data)
        }
      },
      (err) => {
        let { message: errorMessage } = err
        if (errorMessage === 'Network Error') {
          errorMessage = '后端接口连接异常'
        } else if (errorMessage.includes('timeout')) {
          errorMessage = '接口请求超时'
        } else if (errorMessage.includes('Request failed with status code')) {
          errorMessage = '接口' + errorMessage.substr(errorMessage.length - 3) + '异常'
        }
        message.error({
          content: errorMessage,
          duration: 5 * 1000
        })
        return err
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
