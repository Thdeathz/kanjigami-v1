import jwtDecode from 'jwt-decode'

import { useAppSelector } from './useRedux'
import { selectCurrentToken } from '~/features/auth/store/authSlice'

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken)
  let isUser = false
  let isAdmin = false

  if (token) {
    const decoded = jwtDecode(token) as JwtPayload
    const { id, email, roles, username, avatarUrl } = decoded.UserInfo

    isUser = roles?.includes('USER')
    isAdmin = roles?.includes('ADMIN')

    return { userId: id, email, roles, isUser, isAdmin, username, avatarUrl }
  }

  return { userId: '', email: '', roles: [], isUser, isAdmin, username: '', avatarUrl: '' }
}

export default useAuth
