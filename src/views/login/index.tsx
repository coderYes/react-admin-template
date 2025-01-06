import { Layout, Typography } from 'antd'
import { requireImg } from '@/utils/file'
import * as motion from 'motion/react-client'
import LoginForm from './cpn/LoginForm'
import LocalePicker from '@/layout/dashboard/common/locale-picker'

function Login() {
  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center bg-center  bg-no-repeat md:flex"
        style={{
          background: '#353E54'
        }}
      >
        <div className="text-white text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
          React Admin
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
          }}
        >
          <img
            className="max-w-[480px] xl:max-w-[560px]"
            src={requireImg('images/loginImg.png')}
            alt=""
          />
        </motion.div>

        <Typography.Text className="text-white flex flex-row gap-[16px] text-2xl">
          开箱即用的中后台管理系统
        </Typography.Text>
      </div>
      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginForm />
      </div>
      <div className="absolute right-2 top-0">
        <LocalePicker />
      </div>
    </Layout>
  )
}

export default Login
