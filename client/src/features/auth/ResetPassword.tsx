import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

import { useAppSelector } from '~/hooks/useRedux'
import { selectResetEmail, selectVerified } from './store/authSlice'
import { Form, message } from 'antd'
import { useResetPasswordMutation } from './store/authService'
import AuthLayout from './components/AuthLayout'
import Input from '~/components/Input'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '~/components/Button'
import { PWD_REGEX } from '~/config/regex'

const ResetPassword = () => {
  const navigate = useNavigate()
  const verified = useAppSelector(selectVerified)
  const resetEmail = useAppSelector(selectResetEmail)
  const [form] = Form.useForm<ResetPasswordRequest>()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = async (values: ResetPasswordRequest) => {
    if (!resetEmail) return

    if (values.password !== values.confirmPassword) {
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['Password does not match.']
        }
      ])
      return
    }

    try {
      await resetPassword({
        password: values.password
      }).unwrap()

      form.resetFields()
      message.success('Reset password successfully!')
      navigate('/login')
    } catch (error) {
      console.error(error)
      message.error('Something went wrong. Please try again later ><!')
    }
  }

  return (
    <>
      {verified && resetEmail ? (
        <AuthLayout title="Reset password">
          <Form size="large" form={form} onFinish={onFinish} className="min-w-[24rem]">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password is required.' },
                { pattern: PWD_REGEX, message: 'Password must be between 4-12 characters.' }
              ]}
              initialValue=""
            >
              <Input
                id="new-password"
                withPrefix={<p className="w-[8rem]">Password</p>}
                lastIcon={passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                lastIconOnClick={() => setPasswordVisible(prev => !prev)}
                placeholder="secret password"
                type={passwordVisible ? 'text' : 'password'}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Confirm password is required.' }]}
              initialValue=""
            >
              <Input
                id="confirm-password"
                withPrefix={<p className="w-[8rem]">Confirm Password</p>}
                placeholder="secret password"
                type="password"
              />
            </Form.Item>

            <Button
              className="mt-4 w-full text-lg"
              type="primary"
              htmlType="submit"
              disabled={isLoading}
            >
              {isLoading ? <LoadingOutlined className="flex-center" /> : 'Reset password'}
            </Button>
          </Form>
        </AuthLayout>
      ) : (
        <Navigate to="/forgot-password" />
      )}
    </>
  )
}

export default ResetPassword
