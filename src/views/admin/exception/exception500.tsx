import { useThemeToken } from '@/theme/hooks'
import { Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SvgIcon } from '@/components/icon'
import { useTranslation } from 'react-i18next'
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
function Exception500() {
  const { t } = useTranslation()
  const { colorBgBase, colorTextBase, colorPrimary } = useThemeToken()
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error! </title>
      </Helmet>
      <div className="m-auto max-w-[400px] pt-10">
        <div className="flex flex-col items-center justify-center px-2">
          <Typography.Title level={3} className="text-center">
            {t('sys.admin.exception.exception500.title')}
          </Typography.Title>
          <Typography.Paragraph type="secondary" className="text-center">
            {t('sys.admin.exception.exception500.subTitle')}
          </Typography.Paragraph>
          <SvgIcon icon="ic-error500" size="400" color={colorPrimary} />
          <Link
            to={HOMEPAGE}
            style={{ background: colorTextBase, color: colorBgBase }}
            className="rounded-md p-4"
          >
            {t('sys.admin.exception.back')}
          </Link>
        </div>
      </div>
    </>
  )
}

export default Exception500
