import { Breadcrumb, type BreadcrumbProps, type GetProp } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useMatches } from 'react-router-dom'
import { useFlattenedRoutes } from '@/router/hooks'
import { CustomizeProps } from '..'
import { BreadCrumbWrapper } from '../style'
const { VITE_ROUTER_PREFIX: PREFIX, VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

type MenuItem = GetProp<BreadcrumbProps, 'items'>[number]

export default function BreadCrumb({
  themeMode,
  themeLayout,
  darkSidebar,
  darkHeader
}: CustomizeProps) {
  const { t } = useTranslation()
  const matches = useMatches()
  const flattenedRoutes = useFlattenedRoutes()

  const breadCrumbs = useMemo(() => {
    const paths = matches.filter((item) => item.pathname !== '/system').map((item) => item.pathname)
    const pathRouteMetas = flattenedRoutes.filter((item) => paths.includes(PREFIX + item.path))
    const homeItem: MenuItem = {
      key: HOMEPAGE,
      title: <Link to={HOMEPAGE}>{t('Home')}</Link>
    }

    return [
      homeItem,
      ...pathRouteMetas.map((routeMeta): MenuItem => {
        const { path, name } = routeMeta
        return {
          key: path,
          title: t(name)
        }
      })
    ]
  }, [matches, t, flattenedRoutes])

  return (
    <BreadCrumbWrapper $attribute={{ themeMode, themeLayout, darkSidebar, darkHeader }}>
      <Breadcrumb items={breadCrumbs} separator=">" className="!text-sm" />
    </BreadCrumbWrapper>
  )
}
