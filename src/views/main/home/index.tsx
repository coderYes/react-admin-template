import React from 'react'
import type { FC, ReactNode } from 'react'
import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
const { commonStore } = rootStore

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  return (
    <div>
      <div>home</div>
      <div>{commonStore.count}</div>
      <div onClick={() => commonStore.increment()}>count++</div>
    </div>
  )
}

export default observer(Home)
