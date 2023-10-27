import React, { ChangeEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'
import { LoadingOutlined } from '@ant-design/icons'
import { Form, message } from 'antd'

import { useSignupMutation } from './store/authService'
import { EMAIL_REGEX, PWD_REGEX } from '~/config/regex'
import AuthLayout from './components/AuthLayout'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '~/components/Button'
import Input from '~/components/Input'

type FormData = {
  email: string
  password: string
}

type CustomInputPropsType = {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  visible?: boolean
  onVisibleChange?: React.Dispatch<React.SetStateAction<boolean>>
}

// const InputEmail = ({ value, onChange }: CustomInputPropsType) => {
//   const { status } = Form.Item.useStatus()

//   return (
//     <Input
//       className={status === 'success' ? 'border-polar-green-5' : ''}
//       prefix={<MailOutlined className={status === 'success' ? 'text-polar-green-5' : ''} />}
//       placeholder="Email"
//       value={value}
//       onChange={onChange}
//       autoComplete="email"
//     />
//   )
// }

// const InputPassword = ({ value, onChange, visible, onVisibleChange }: CustomInputPropsType) => {
//   const { status } = Form.Item.useStatus()

//   return (
//     <Input.Password
//       className={status === 'success' ? 'border-polar-green-5' : ''}
//       prefix={<LockOutlined className={status === 'success' ? 'text-polar-green-5' : ''} />}
//       placeholder="Password"
//       visibilityToggle={{ visible, onVisibleChange }}
//       value={value}
//       onChange={onChange}
//       autoComplete="current-password"
//     />
//   )
// }

const Signup = () => {
  useDocumentTitle('Register | 漢字ガミ')

  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [signup, { isLoading }] = useSignupMutation()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = async (data: FormData) => {
    try {
      const { email, password } = data
      await signup({ email, password }).unwrap()
      form.resetFields()
      message.success('Create accout successfully!')
      navigate('/')
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status === 409) {
        form.setFields([{ name: 'email', errors: ['User already exists'] }])
      } else {
        message.error('No server response. Please try again later ><!')
      }
    }
  }

  return (
    <AuthLayout title="Sign up">
      <Form
        form={form}
        name="register"
        size="large"
        autoComplete="off"
        onFinish={onFinish}
        className="min-w-[24rem]"
      >
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

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Password is required.' },
            { pattern: PWD_REGEX, message: 'Password must be between 4-12 characters.' }
          ]}
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
            <Link to="/forgot-password" className="transition-colors hover:text-primary-5">
              Forgot password ?
            </Link>
          </p>
        </div>

        <Button className="w-full text-lg" type="primary" htmlType="submit">
          {isLoading ? <LoadingOutlined /> : 'Create account'}
        </Button>

        <div className="mt-2 text-base text-text-light dark:text-text-dark">
          Already has account?{' '}
          <Link
            to="/login"
            className="cursor-pointer font-medium text-primary-5 transition-all hover:border-b"
          >
            Login
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default Signup
