import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCodeImg } from '@/api/login'
import { ILoginType, IVerifyCodeType } from '@/types/login'
import { decrypt, encrypt } from '@/utils/jsencrypt'
import { useNavigate } from 'react-router-dom'
import rootStore from '@/store'
import Cookies from 'js-cookie'

function LoginForm() {
  const navigate = useNavigate()
  const { userStore } = rootStore
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [codeUrl, setCodeUrl] = useState('')

  useEffect(() => {
    getCode()
    getCookie()
  }, [])

  const getCookie = () => {
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const remember = Cookies.get('remember')
    form.setFieldsValue({
      username: username === undefined ? '' : username,
      password: password === undefined ? '' : decrypt(password),
      remember: remember === undefined ? false : Boolean(remember)
    })
  }

  const getCode = () => {
    getCodeImg().then((res: { data: IVerifyCodeType }) => {
      setCodeUrl(res.data.image)
      form.setFieldValue('uuid', res.data.key)
    })
  }

  const handleFinish = async (formValue: ILoginType) => {
    const uuid = form.getFieldValue('uuid')
    const remember = form.getFieldValue('remember')
    const data = {
      username: formValue.username,
      password: formValue.password,
      code: formValue.code,
      uuid
    }
    if (remember) {
      Cookies.set('username', formValue.username, { expires: 30 })
      Cookies.set('password', String(encrypt(formValue.password)), {
        expires: 30
      })
      Cookies.set('remember', String(remember), { expires: 30 })
    } else {
      Cookies.remove('username')
      Cookies.remove('password')
      Cookies.remove('remember')
    }
    setLoading(true)
    try {
      userStore
        .login(data)
        .then(() => {
          navigate('/')
          message.success('登录成功')
        })
        .catch(() => {
          // 重新获取验证码
          getCode()
        })
        .finally(() => {
          setLoading(false)
        })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t('sys.login.signInFormTitle')}</div>
      <Form form={form} name="login" size="large" onFinish={handleFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
        >
          <Input placeholder={t('sys.login.userName')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
        >
          <Input.Password autoComplete="on" placeholder={t('sys.login.password')} />
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="code"
              rules={[{ required: true, message: t('sys.login.codePlaceholder') }]}
            >
              <Input placeholder={t('sys.login.code')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <img className="rounded h-9" src={codeUrl} onClick={getCode} />
          </Col>
        </Row>
        <Form.Item>
          <Row align="middle">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
