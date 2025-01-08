import { Breadcrumb, type BreadcrumbProps, type GetProp } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMatches } from 'react-router-dom'
import { useFlattenedRoutes } from '@/router/hooks'

type MenuItem = GetProp<BreadcrumbProps, 'items'>[number]

export default function BreadCrumb() {
  const { t } = useTranslation()
  const matches = useMatches()
  const flattenedRoutes = useFlattenedRoutes()

  const breadCrumbs = useMemo(() => {
    const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname)
    const pathRouteMetas = flattenedRoutes.filter((item) => paths.includes(item.path))
    return pathRouteMetas.map((routeMeta): MenuItem => {
      const { path, name } = routeMeta
      return {
        key: path,
        title: t(name)
      }
    })
  }, [matches, t, flattenedRoutes])

  return <Breadcrumb items={breadCrumbs} className="!text-sm" />
}
