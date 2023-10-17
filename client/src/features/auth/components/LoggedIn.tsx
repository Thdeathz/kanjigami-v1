import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '~/hooks/useAuth'

const LoggedIn = () => {
  const location = useLocation()
  const { email } = useAuth()

  return <>{email ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />}</>
}

export default LoggedIn
