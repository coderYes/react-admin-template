import { Spin } from 'antd'

interface Props {
  other?: string
}
export function CircleLoading({ other }: Props) {
  return (
    <div className={`flex h-full items-center justify-center ${other}`}>
      <Spin size="large" />
    </div>
  )
}
