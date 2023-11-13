declare interface OTP {
  first: string
  second: string
  third: string
  fourth: string
}

declare type UserCredentials = {
  email: string
  password: string
}

declare type ROLE = 'USER' | 'ADMIN'

declare interface ResetPasswordRequest {
  password: string
  confirmPassword: string
}

declare interface JwtPayload {
  UserInfo: {
    id: string
    email: string
    username: string
    avatarUrl?: string
    roles: ROLE[]
  }
}

declare interface RegisterRequest {
  username: string
  email: string
  password: string
}
