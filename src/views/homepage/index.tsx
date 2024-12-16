import { Button } from 'antd'
import { setCache } from '@/utils/localCache'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  const handleSetToken = () => {
    setCache('token', 123)
    navigate('/admin')
  }
  return <Button onClick={() => handleSetToken()}>HomePage</Button>
}

export default HomePage
