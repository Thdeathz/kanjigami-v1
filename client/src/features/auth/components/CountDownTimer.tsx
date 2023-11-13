import React from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCountdown, useEffectOnce } from 'usehooks-ts'

import { useForgotPasswordMutation } from '../store/authService'
import Loading from '~/components/Loading'

type PropsType = {
  resetEmail: string
}

const CountDownTimer = ({ resetEmail }: PropsType) => {
  const navigate = useNavigate()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 90,
    intervalMs: 1000
  })

  const onReSendOTP = async () => {
    if (count > 0 || isLoading) return

    try {
      const response = await forgotPassword(resetEmail)
      if (!response) return
      resetCountdown()
      startCountdown()
    } catch (error) {
      message.error('No server response. Please try again later ><!')
      navigate('/login')
    }
  }

  useEffectOnce(() => {
    startCountdown()
  })

  return (
    <div className="mt-2 text-base font-medium text-text-light dark:text-text-dark">
      Didn't recieve code?{' '}
      <button
        type="button"
        onClick={onReSendOTP}
        disabled={count > 0 || isLoading}
        className={`
        h-5 cursor-pointer font-medium transition-all
        ${
          count > 0 || isLoading
            ? 'text-text-secondary-light dark:text-text-secondary-dark'
            : ' text-primary-5 hover:border-b'
        }
      `}
      >
        {count > 0 ? (
          `Resend in ${count}s`
        ) : isLoading ? (
          <Loading className="ml-4" />
        ) : (
          'Resend OTP'
        )}
      </button>
    </div>
  )
}

export default CountDownTimer
