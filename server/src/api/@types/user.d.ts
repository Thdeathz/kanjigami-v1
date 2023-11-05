import { Role } from '@prisma/client'

export declare interface RegisterRequest {
  email: string
  password: string
  roles?: Role[]
}
