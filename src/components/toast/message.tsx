import { createRef, forwardRef, ReactNode, useImperativeHandle } from 'react'
import { message } from 'antd'

type ToastMessage =
  | string
  | {
      content: string
      duration?: number
      type?: 'info' | 'success' | 'error' | 'warning' | 'loading'
      icon?: ReactNode
    }

const Toast = forwardRef((props, ref) => {
  const [messageApi, contextHolder] = message.useMessage()

  useImperativeHandle(ref, () => ({
    show: (msg: ToastMessage) => {
      return new Promise<boolean>((resolve) => {
        if (typeof msg === 'string') {
          messageApi.info(msg).then(resolve)
        } else {
          messageApi
            .open({
              content: msg.content,
              duration: msg.duration,
              type: msg.type || 'info'
            })
            .then(resolve)
        }
      })
    }
  }))

  return <>{contextHolder}</>
})

const ToastRef = createRef<{
  show: (msg: ToastMessage) => Promise<boolean>
}>()

export const ToastContain = () => {
  return <Toast ref={ToastRef} />
}

export const toast = (msg: ToastMessage) => {
  if (ToastRef.current) {
    return ToastRef.current.show(msg)
  }
  return Promise.resolve(false)
}
