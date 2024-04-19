import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const User: FC<IProps> = () => {
  return <div>User</div>
}

export default memo(User)
