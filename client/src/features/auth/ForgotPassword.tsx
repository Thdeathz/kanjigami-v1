import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, message } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

import { EMAIL_REGEX } from '~/config/regex'
import { useForgotPasswordMutation } from './store/authService'
import AuthLayout from './components/AuthLayout'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Loading from '~/components/Loading'

type ForgotPasswordForm = {
  email: string
}

const ForgotPassword = () => {
  useDocumentTitle('Reset password | 漢字ガミ')

  const navigate = useNavigate()
  const [form] = Form.useForm<ForgotPasswordForm>()

  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation()

  const onFinish = async (values: ForgotPasswordForm) => {
    try {
      const response = await forgotPassword(values.email).unwrap()
      if (!response) return

      message.success('OTP has been sent to your email.')
      navigate('/verify-email')
    } catch (error) {
      const apiError = error as ApiError
      if (apiError.status === 401) {
        form.setFields([
          {
            name: 'email',
            errors: ['Email is not registered.']
          }
        ])
      } else if (apiError.status === 400) {
        form.setFields([
          {
            name: 'email',
            errors: [`${apiError.data.data}`]
          }
        ])
      } else {
        message.error('No server response. Please try again later ><!')
      }
    }
  }

  return (
    <AuthLayout title="Forgot password">
      <Form form={form} name="forgot-password" size="large" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required.' },
            { pattern: EMAIL_REGEX, message: 'Email is not valid.' }
          ]}
          initialValue=""
        >
          <Input id="forgot-email" placeholder="example@gmail.com" disabled={isSuccess} />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading || isSuccess}
          className="mt-2 w-full text-lg"
        >
          {isLoading ? <Loading /> : 'Send OTP'}
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default ForgotPassword
