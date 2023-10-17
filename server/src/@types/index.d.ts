import { Role } from '@prisma/client'

export declare interface UserData {
  id?: Types.ObjectId
  email: string
  password?: string
  roles?: Role[]
  active?: boolean
}

export declare interface UserObject {
  email: string
  password: string
  roles?: Role[]
}
