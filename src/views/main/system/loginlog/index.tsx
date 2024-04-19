import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Loginlog: FC<IProps> = () => {
  return <div>Loginlog</div>
}

export default memo(Loginlog)
