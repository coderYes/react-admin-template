import { Suspense } from 'react'
import loadable from '@loadable/component'
const modules = import.meta.glob('@/views/main/*/**/*.tsx')
const loadables: any = loadable

function LazyLoad(url: string) {
  const ComponentNode = loadables(async () => {
    return modules[`/src/views/main${url}/index.tsx`]()
  })
  return (
    <Suspense>
      <ComponentNode />
    </Suspense>
  )
}

export default LazyLoad
