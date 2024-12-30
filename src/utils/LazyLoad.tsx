import { Suspense } from 'react'
import { CircleLoading } from '@/components/loading'
import { Outlet } from 'react-router-dom'
import loadable from '@loadable/component'
import KeepAlive from 'react-activation'

const modules = import.meta.glob('@/views/admin/*/**/*.tsx')
const keysArray = Object.keys(modules)
const loadables: any = loadable

export function LazyLoad(url: string) {
  // /user/:id/:name -> /user
  const cleanedPath = url.replace(/\/:[a-zA-Z]+/g, '')

  const moduleKey = `/src/views${cleanedPath}.tsx`
  const isExist = keysArray.includes(moduleKey)

  const ComponentNode = isExist
    ? loadables(async () => {
        return modules[`/src/views${cleanedPath}.tsx`]()
      })
    : loadables(async () => {
        return modules[`/src/views/admin/exception/exception404.tsx`]()
      })

  return (
    <Suspense fallback={<CircleLoading />}>
      <KeepAlive>
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
