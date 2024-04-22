import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import baseRouter from './baseRouter'
import rootStore from '@/store'
import { observer } from 'mobx-react-lite'
const { commonStore } = rootStore
import { toJS } from 'mobx'
import LazyLoad from '@/utils/LazyLoad'

function GetRoutes() {
  useEffect(() => {
    baseRouter[0].children?.push(...toJS(commonStore.routes))
    baseRouter[0].children![0].element = LazyLoad('/notFound')
  }, [commonStore.routes])
  const element = useRoutes(baseRouter)
  return <>{element}</>
}

export default observer(GetRoutes)
