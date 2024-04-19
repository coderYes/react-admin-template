import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Role: FC<IProps> = () => {
  return <div>Role</div>
}

export default memo(Role)
