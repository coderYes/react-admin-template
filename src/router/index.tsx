import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import baseRouter from './baseRouter'
import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
const { commonStore } = rootStore
import { toJS } from 'mobx'

function GetRoutes() {
  useEffect(() => {
    baseRouter[0].children?.push(...toJS(commonStore.routes))
  }, [commonStore.routes])
  const element = useRoutes(baseRouter)
  return <>{element}</>
}

export default observer(GetRoutes)
