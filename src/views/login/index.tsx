import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/main/home')
  }
  return (
    <div className="h-full">
      <div>Login</div>
      <div onClick={goHome}>goHome</div>
    </div>
  )
}

export default memo(Login)
