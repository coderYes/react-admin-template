import { Suspense } from 'react'
import { CircleLoading } from '@/components/loading'
import { Outlet } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import loadable from '@loadable/component'
import KeepAlive from 'react-activation'

const modules = import.meta.glob('@/views/*/*/**/*.tsx')
const keysArray = Object.keys(modules)
const loadables: any = loadable

export function LazyLoad(url: string) {
  const moduleKey = `/src/views${url}.tsx`
  const isExist = keysArray.includes(moduleKey)
  const ComponentNode = isExist
    ? loadables(async () => {
        return modules[moduleKey]()
      })
    : loadables(async () => {
        return modules[`/src/views/system/exception/exception404.tsx`]()
      })

  return (
    <Suspense fallback={<CircleLoading />}>
      <KeepAlive cacheKey={uuidv4()}>
        <ComponentNode />
      </KeepAlive>
    </Suspense>
  )
}

export function SuspenseHOC() {
  return (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  )
}
