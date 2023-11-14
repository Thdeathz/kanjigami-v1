import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '~/hooks/useAuth'

function LoggedIn() {
  const location = useLocation()
  const { email } = useAuth()

  if (email) return <Navigate to="/" state={{ from: location }} replace />

  return <Outlet />
}

export default LoggedIn
