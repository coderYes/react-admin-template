import { Tabs, type TabsProps } from 'antd'
import { useTranslation } from 'react-i18next'
import ScrollbarView from './cpn/scroll/scroll-bar'
import InfiniteScroll from './cpn/scroll/infinite-scroll'
function Scroll() {
  const { t } = useTranslation()

  const TABS: TabsProps['items'] = [
    {
      key: 'scrollbar',
      label: t('sys.admin.system.scroll.scrollbar'),
      children: <ScrollbarView />
    },
    {
      key: 'infiniteScroll',
      label: t('sys.admin.system.scroll.infiniteScroll'),
      children: <InfiniteScroll />
    }
    // {
    //   key: 'scroll-progress',
    //   label: 'ScrollProgress',
    //   children: <ScrollProgressView />
    // }
  ]

  return <Tabs items={TABS} />
}

export default Scroll
