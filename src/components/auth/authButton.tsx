import { memo } from 'react'
import type { FC } from 'react'
import rootStore from '@/store'

type Props = {
  children: any
  perms: string
}
const AuthButton: FC<Props> = ({ children, perms }) => {
  const {
    userStore: { permissions }
  } = rootStore
  const all_permission = '*:*:*'
  const hasPermissions = permissions.some((permission) => {
    return all_permission === permission || perms === permission
  })

  if (hasPermissions) {
    return children
  } else {
    return <></>
  }
}

export default memo(AuthButton)
