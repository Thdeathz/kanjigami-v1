import { Role } from '@prisma/client'

export declare interface LoginRequest {
  email: string
  password: string
}

export declare interface RefreshTokenPayload {
  id: string
}

export declare interface AccessTokenPayload {
  UserInfo: {
    id: string
    username: string
    avatarUrl?: string
    email: string
    roles: Role[]
  }
}

export declare interface CurrentUserData {
  refreshToken: string
  userData: {
    id: string
    username: string
    avatarUrl?: string
    email: string
    roles: Role[]
  }
}
