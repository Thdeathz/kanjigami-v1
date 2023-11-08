import { Role } from '@prisma/client'

export declare interface RegisterRequest {
  email: string
  password: string
  username: string
  roles?: Role[]
}

export declare interface RegisterByGoogle {
  id: string
  email: string
  username: string
  avatarUrl?: string
}
