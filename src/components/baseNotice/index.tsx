import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'
let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

export default function BaseNotice() {
  const notice = App.useApp()
  message = notice.message
  notification = notice.notification
  modal = notice.modal
  return null
}
export { message, notification, modal }
