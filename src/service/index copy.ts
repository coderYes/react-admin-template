import axios from 'axios'
import { getToken } from '@/utils/localCache'
import { notification, message, Modal } from 'antd'
import errorCode from '@/utils/errorCode'
const { confirm } = Modal

type ErrorCodeKey = keyof typeof errorCode

// 是否显示重新登录
export const isRelogin = { show: false }

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false

    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    const codeStr = `${code}`
    // 获取错误信息
    const msg = errorCode[`${codeStr as ErrorCodeKey}`] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        confirm({
          title: '系统提示',
          content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
          onOk() {
            isRelogin.show = false
            // useUserStore()
            //   .logOut()
            //   .then(() => {
            //     location.href = '/index'
            //   })
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
      notification.error({ message: msg })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '接口' + message.substr(message.length - 3) + '异常'
    }
    message.error(message, 5 * 1000)
    return Promise.reject(error)
  }
)

export default service
