import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Form, Input, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useAppSelector } from '~/hooks/useRedux'
import { selectResetEmail } from './store/authSlice'
import CountDownTimer from './components/CountDownTimer'
import { useVerifyOTPTokenMutation } from './store/authService'
import AuthLayout from './components/AuthLayout'
import Button from '~/components/Button'

type OTPInputProps = {
  name: string
}

const OTPInput = ({ name }: OTPInputProps) => {
  return (
    <Form.Item name={name}>
      <Input
        className="h-16 w-16 text-center text-2xl text-text-light dark:text-text-dark"
        maxLength={1}
        autoComplete="off"
      />
    </Form.Item>
  )
}

const VerifyOTP = () => {
  const navigate = useNavigate()
  const resetEmail = useAppSelector(selectResetEmail)
  const [form] = Form.useForm<OTP>()

  const [verifyOTP, { isLoading }] = useVerifyOTPTokenMutation()

  const onFinish = async (values: OTP) => {
    const { first, second, third, fourth } = values
    const otpToken = `${first}${second}${third}${fourth}`

    try {
      await verifyOTP({ otpToken, email: resetEmail }).unwrap()
      form.resetFields()
      message.success('Verify OTP successfully.')
      navigate('/reset-password')
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status === 401) {
        form.setFields([
          {
            name: 'first',
            errors: [' ']
          },
          {
            name: 'second',
            errors: [' ']
          },
          {
            name: 'third',
            errors: [' ']
          },
          {
            name: 'fourth',
            errors: [' ']
          }
        ])
        switch (apiError.data.message) {
          case 'Unauthorized/InvalidToken':
            message.error('Token invalid.')
            break
          case 'Unauthorized/TokenExpired':
            message.error('Token expired.')
            break
          default:
            break
        }
      } else {
        message.error('No server response. Please try again later ><!')
        navigate('/forgot-password')
      }
    }
  }

  return (
    <>
      {resetEmail ? (
        <AuthLayout title="Email verification">
          <Form size="large" form={form} onFinish={onFinish}>
            <div className="flex-center w-full flex-row gap-4">
              <OTPInput name="first" />

              <OTPInput name="second" />

              <OTPInput name="third" />

              <OTPInput name="fourth" />
            </div>

            <Button
              disabled={isLoading}
              className="mb-2 w-full text-lg"
              type="primary"
              htmlType="submit"
            >
              {isLoading ? <LoadingOutlined className="flex-center" /> : 'Verify Account'}
            </Button>

            <CountDownTimer resetEmail={resetEmail} />
          </Form>
        </AuthLayout>
      ) : (
        <Navigate to="/forgot-password" />
      )}
    </>
  )
}

export default VerifyOTP
