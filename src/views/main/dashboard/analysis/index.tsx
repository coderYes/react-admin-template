import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Analysis: FC<IProps> = () => {
  return <div>analysis</div>
}

export default memo(Analysis)
