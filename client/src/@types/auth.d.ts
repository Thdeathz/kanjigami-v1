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
  email: string
  password: string
  confirmPassword: string
}