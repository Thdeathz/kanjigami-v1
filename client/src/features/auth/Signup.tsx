import { Form, message } from 'antd'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import Button from '~/components/Button'
import Input from '~/components/Input'
import Loading from '~/components/Loading'
import { EMAIL_REGEX, PWD_REGEX } from '~/config/regex'

import AuthLayout from './components/AuthLayout'
import { useSignupMutation } from './store/authService'
import { signUpErrorMessages } from './utils/errorMessages'

function Signup() {
  useDocumentTitle('Register | 漢字ガミ')

  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [signup, { isLoading }] = useSignupMutation()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = async (data: RegisterRequest) => {
    try {
      await signup({ ...data }).unwrap()
      form.resetFields()
      message.success('Create accout successfully!')
      navigate('/')
    } catch (error) {
      const errorMessage = signUpErrorMessages[(error as ApiError).data.message]
      if (errorMessage) {
        form.setFields([errorMessage])
      } else {
        message.error('No server response. Please try again later ><!')
      }
    }
  }

  return (
    <AuthLayout title="Sign up">
      <Form form={form} name="register" size="large" autoComplete="off" onFinish={onFinish} className="min-w-[24rem]">
        <Form.Item name="username" rules={[{ required: true, message: 'Username is required.' }]} initialValue="">
          <Input
            id="username"
            withPrefix={<p className="w-[4rem]">Username</p>}
            maxLength={20}
            placeholder="username"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required.' },
            { pattern: EMAIL_REGEX, message: 'Email is not valid.' }
          ]}
          initialValue=""
        >
          <Input
            id="email"
            withPrefix={<p className="w-[4rem]">Email</p>}
            placeholder="example@gmail.com"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Password is required.' },
            { pattern: PWD_REGEX, message: 'Password must be between 4-12 characters.' }
          ]}
          initialValue=""
        >
          <Input
            id="password"
            withPrefix={<p className="w-[4rem]">Password</p>}
            lastIcon={passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            lastIconOnClick={() => setPasswordVisible(prev => !prev)}
            placeholder="secret password"
            type={passwordVisible ? 'text' : 'password'}
          />
        </Form.Item>

        <div className="mb-2 flex w-full items-center justify-end text-text-light dark:text-text-dark">
          <p>
            <Link to="/forgot-password" className="hover:text-primary-5 transition-colors">
              Forgot password ?
            </Link>
          </p>
        </div>

        <Button className="w-full text-lg" type="primary" htmlType="submit">
          {isLoading ? <Loading /> : 'Create account'}
        </Button>

        <div className="mt-4 text-base text-text-light dark:text-text-dark">
          Already has account?{' '}
          <Link to="/login" className="text-primary-5 cursor-pointer font-medium transition-all hover:border-b">
            Sign in
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default Signup
