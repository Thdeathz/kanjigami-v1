import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuth from '~/hooks/useAuth'

type PropsType = {
  allowedRoles: ROLE[]
}

function RequireAuth({ allowedRoles }: PropsType) {
  const location = useLocation()
  const { roles } = useAuth()

  if (roles.some(role => allowedRoles.includes(role))) return <Outlet />

  return <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth
