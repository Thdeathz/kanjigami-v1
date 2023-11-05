import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Divider, Form, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useDocumentTitle } from 'usehooks-ts'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import usePersist from '~/hooks/usePersist'
import { EMAIL_REGEX } from '~/config/regex'
import GoogleLogin from './components/GoogleLogin'
import Button from '~/components/Button'
import AuthLayout from './components/AuthLayout'
import Input from '~/components/Input'
import { useLoginByEmailMutation } from './store/authService'

const Login = () => {
  useDocumentTitle('Login | 漢字ガミ')

  const navigate = useNavigate()

  const [form] = Form.useForm<UserCredentials>()
  const [loginByEmail, { isLoading }] = useLoginByEmailMutation()
  const { persist, setPersist } = usePersist()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = async (data: UserCredentials) => {
    try {
      const { email, password } = data
      await loginByEmail({ email, password }).unwrap()
      form.resetFields()
      message.success('Login successfully!')
      navigate('/')
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status === 401) {
        switch (apiError.data.message) {
          case 'Unauthorized/InvalidEmail':
            form.setFields([
              {
                name: 'email',
                errors: ['Invalid email.']
              }
            ])
            break
          case 'Unauthorized/InvalidPassword':
            form.setFields([
              {
                name: 'password',
                errors: ['Invalid password.']
              }
            ])
            break
          default:
            form.setFields([
              {
                name: 'email',
                errors: [' ']
              },
              {
                name: 'password',
                errors: [' ']
              }
            ])
            break
        }
      } else {
        message.error('No server response. Please try again later ><!')
      }
    }
  }

  return (
    <AuthLayout title="Sign in">
      <Form form={form} name="login" size="large" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required.' },
            { pattern: EMAIL_REGEX, message: 'Email is not valid.' }
          ]}
        >
          <Input
            id="email"
            withPrefix={<p className="w-[4rem]">Email</p>}
            placeholder="example@gmail.com"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Password is required.' }]}>
          <Input
            id="password"
            withPrefix={<p className="w-[4rem]">Password</p>}
            lastIcon={passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            lastIconOnClick={() => setPasswordVisible(prev => !prev)}
            placeholder="secret password"
            type={passwordVisible ? 'text' : 'password'}
          />
        </Form.Item>

        <div className="mb-2 flex items-center justify-between text-text-light dark:text-text-dark">
          <Checkbox
            defaultChecked={persist}
            onChange={() => setPersist(prev => !prev)}
            className="text-text-light dark:text-text-dark"
          >
            Remember me
          </Checkbox>

          <p>
            <Link to="/forgot-password" className="hover:text-primary-5 transition-colors">
              Forgot password ?
            </Link>
          </p>
        </div>

        <Button className="w-full text-lg" type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? <LoadingOutlined className="flex-center" /> : 'Login'}
        </Button>

        <Divider plain className="uppercase text-text-light dark:text-text-dark">
          or
        </Divider>

        <GoogleLogin form={form} />

        <div className="mt-4 text-base text-text-light dark:text-text-dark">
          Haven't account yet?{' '}
          <Link
            to="/signup"
            className="text-primary-5 cursor-pointer font-medium transition-all hover:border-b"
          >
            Register
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default Login
