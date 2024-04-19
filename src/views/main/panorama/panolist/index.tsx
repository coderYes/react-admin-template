import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Panolist: FC<IProps> = () => {
  return <div>Panolist</div>
}

export default memo(Panolist)
