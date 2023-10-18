import jwtDecode from 'jwt-decode'

import { useAppSelector } from './useRedux'
import { selectCurrentToken } from '~/features/auth/store/authSlice'

type JwtPayload = {
  UserInfo: {
    email: string
    roles: ROLE[]
  }
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken)
  let isUser = false
  let isAdmin = false

  console.log('token', token)

  if (token) {
    const decoded = jwtDecode(token) as JwtPayload
    const { email, roles } = decoded.UserInfo

    isUser = roles?.includes('USER')
    isAdmin = roles?.includes('ADMIN')

    return { email, roles, isUser, isAdmin }
  }

  return { email: '', roles: [], isUser, isAdmin }
}

export default useAuth
