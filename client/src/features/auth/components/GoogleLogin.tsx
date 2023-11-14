import { FormInstance, message } from 'antd'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import GoogleLogo from '~/assets/google_logo.svg'
import Button from '~/components/Button'
import Image from '~/components/Image'
import Loading from '~/components/Loading'
import { auth, googleProvider } from '~/config/firebase'

import { useLoginByGoogleMutation } from '../store/authService'

type PropsType = {
  form: FormInstance<UserCredentials>
}

function GoogleLogin({ form }: PropsType) {
  const navigate = useNavigate()
  const [loginByGoogle, { isLoading }] = useLoginByGoogleMutation()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (!result) return

      const googleIdToken = await result.user.getIdToken(true)
      if (!googleIdToken) return
      await loginByGoogle(googleIdToken).unwrap()

      form.resetFields()
      message.success('Login successfully!')
      navigate('/')
    } catch (error) {
      console.error('==> Error', error)
      message.error('Login failed! Please try again later.')
    }
  }

  return (
    <Button htmlType="button" className="flex-center group w-full" onClick={handleGoogleLogin}>
      <Image src={GoogleLogo} className="w-[2rem]" />
      {isLoading ? (
        <Loading className="flex-center" />
      ) : (
        <span className="text-base font-semibold">Sign in with Google</span>
      )}
    </Button>
  )
}

export default GoogleLogin
