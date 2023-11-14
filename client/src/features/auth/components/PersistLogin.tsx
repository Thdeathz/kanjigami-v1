import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import usePersist from '~/hooks/usePersist'
import { useAppSelector } from '~/hooks/useRedux'

import { useRefreshMutation } from '../store/authService'
import { selectCurrentToken } from '../store/authSlice'

function PersistLogin() {
  const { persist } = usePersist()
  const token = useAppSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState<boolean>(false)

  const [refresh, { isUninitialized, isLoading, isSuccess }] = useRefreshMutation()

  const verifyRefreshToken = useCallback(async () => {
    try {
      await refresh(undefined)
      setTrueSuccess(true)
    } catch (error) {
      console.error(error)
    }
  }, [refresh])

  useEffect(() => {
    if ((effectRan.current === true || import.meta.env.VITE_NODE_ENV !== 'development') && !token && persist) {
      verifyRefreshToken()
    }

    return () => {
      effectRan.current = true
    }
  }, [persist, verifyRefreshToken, token])

  const shouldRenderOutlet = !persist || (isSuccess && trueSuccess) || (token && isUninitialized) || trueSuccess

  if (!shouldRenderOutlet || isLoading) return <DefaultLayout>Loading...</DefaultLayout>

  return <Outlet />
}

export default PersistLogin
