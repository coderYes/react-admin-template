import { Button } from 'antd'
import { setCache } from '@/utils/localCache'
import rootStore from '@/store'

function HomePage() {
  const { userStore } = rootStore
  const handleSetToken = () => {
    setCache('token', 123)
    userStore.setUserInfo({
      id: '100000001',
      username: 'admin',
      email: 'rainz0000@outlook.com',
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
      role: ['admin']
    })
    window.location.href = '/admin'
  }
  return <Button onClick={() => handleSetToken()}>HomePage</Button>
}

export default HomePage
