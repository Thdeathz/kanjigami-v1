import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import usePersist from '~/hooks/usePersist'
import { useAppSelector } from '~/hooks/useRedux'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import { selectCurrentToken } from '../store/authSlice'
import { useRefreshMutation } from '../store/authService'

const PersistLogin = () => {
  const { persist } = usePersist()
  const token = useAppSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState<boolean>(false)

  const [refresh, { isUninitialized, isLoading, isSuccess }] = useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || import.meta.env.VITE_NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh(undefined)
          setTrueSuccess(true)
        } catch (error) {
          console.error(error)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => {
      effectRan.current = true
    }
  }, [persist, refresh, token])
  return (
    <>
      {!persist || (isSuccess && trueSuccess) || (token && isUninitialized) ? (
        <Outlet />
      ) : isLoading ? (
        <DefaultLayout>Loading...</DefaultLayout>
      ) : (
        trueSuccess && <Outlet />
      )}
    </>
  )
}

export default PersistLogin
