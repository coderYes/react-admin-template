import { createRef, forwardRef, ReactNode, useImperativeHandle } from 'react'
import { notification } from 'antd'

type NotificationConfig = {
  message: string
  description: string
  placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'
  type?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  showProgress?: boolean
  pauseOnHover?: boolean
  icon?: ReactNode
  btn?: ReactNode
  closeIcon?: boolean
}

const Notification = forwardRef((props, ref) => {
  const [api, contextHolder] = notification.useNotification({
    stack: {
      threshold: 3
    }
  })

  useImperativeHandle(ref, () => ({
    show: (config: NotificationConfig) => {
      const key = `open${Date.now()}`
      const btnWithClose = config.btn ? (
        <div onClick={() => api.destroy(key)}>{config.btn}</div>
      ) : null
      return new Promise<void>((resolve) => {
        api[config.type || 'info']({
          ...config,
          key,
          btn: btnWithClose,
          onClose: () => {
            resolve()
          }
        })
      })
    }
  }))

  return <>{contextHolder}</>
})

const NotificationRef = createRef<{
  show: (config: NotificationConfig) => Promise<boolean>
}>()

export const NotificationContain = () => {
  return <Notification ref={NotificationRef} />
}

export const notice = (config: NotificationConfig) => {
  if (NotificationRef.current) {
    return NotificationRef.current.show(config)
  }
  return Promise.resolve(false)
}
