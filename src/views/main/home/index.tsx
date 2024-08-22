import React from 'react'
import type { FC, ReactNode } from 'react'
import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
import { login } from '@/api/test'
import { HomeWrapper } from './HomeWrapper'
const { commonStore } = rootStore

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const loginAccount = () => {
    login('zgw', 'a010827').then((res) => {
      console.log(res)
    })
  }

  return (
    <HomeWrapper>
      <div>home</div>
      <div>{commonStore.count}</div>
      <div className="cursor-btn" onClick={() => commonStore.increment()}>
        <span>count++</span>
      </div>
      <div onClick={() => loginAccount()}>test login</div>
    </HomeWrapper>
  )
}

export default observer(Home)
