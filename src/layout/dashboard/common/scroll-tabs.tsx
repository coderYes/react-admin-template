import { useEffect, useRef, type ReactNode } from 'react'
import { TabItemType } from '../multiTabs'

type Props = {
  children: ReactNode
  activeTabRoutePath: string
  tabs: TabItemType[]
}
export default function ScrollTabs({ children, activeTabRoutePath, tabs }: Props) {
  const scrollContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleMouseWheel(event: WheelEvent) {
      // event.preventDefault()
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += event.deltaY / 3
      }
    }
    if (scrollContainer.current) {
      scrollContainer.current.addEventListener('mouseenter', () => {
        if (scrollContainer.current) {
          scrollContainer.current.addEventListener('wheel', handleMouseWheel)
        }
      })
      scrollContainer.current.addEventListener('mouseleave', () => {
        scrollContainer.current?.removeEventListener('wheel', handleMouseWheel)
      })
    }
  }, [])

  useEffect(() => {
    if (!scrollContainer || !scrollContainer.current) {
      return
    }
    const index = tabs.findIndex((tab) => tab.key === activeTabRoutePath)
    const currentTabElement = scrollContainer.current.querySelector(`#tab-${index}`)
    if (currentTabElement) {
      currentTabElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [activeTabRoutePath, tabs])

  return (
    <div ref={scrollContainer} className="hide-scrollbar flex w-full px-2">
      {children}
    </div>
  )
}
