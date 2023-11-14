import { Form, message } from 'antd'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Navigate, useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import Input from '~/components/Input'
import Loading from '~/components/Loading'
import { PWD_REGEX } from '~/config/regex'
import { useAppSelector } from '~/hooks/useRedux'

import AuthLayout from './components/AuthLayout'
import { useResetPasswordMutation } from './store/authService'
import { selectResetEmail, selectVerified } from './store/authSlice'

function ResetPassword() {
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
      message.error('Something went wrong. Please try again later ><!')
    }
  }

  if (!verified || !resetEmail) return <Navigate to="/forgot-password" />

  return (
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

        <Button className="mt-4 w-full text-lg" type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? <Loading /> : 'Reset password'}
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default ResetPassword
