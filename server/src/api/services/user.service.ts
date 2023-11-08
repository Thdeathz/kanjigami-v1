import bcrypt from 'bcrypt'

import prisma from '../databases/init.prisma'
import { RegisterByGoogle, RegisterRequest } from '../@types/user'
import HttpError from '../helpers/httpError'

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      roles: true,
      avatarUrl: true,
      account: {
        select: {
          email: true,
          isActive: true
        }
      }
    }
  })
}

const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      roles: true,
      avatarUrl: true,
      account: {
        select: {
          email: true,
          isActive: true
        }
      }
    }
  })
}

const getUserByEmail = async (email: string) => {
  return await prisma.account.findUnique({
    where: { email },
    select: {
      userId: true,
      email: true,
      isActive: true,
      password: true,
      user: {
        select: {
          id: true,
          username: true,
          roles: true,
          avatarUrl: true
        }
      }
    }
  })
}

const checkUserExisted = async (email: string, username: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ account: { email } }, { username }]
      },
      include: {
        account: {
          select: {
            email: true,
            isActive: true
          }
        }
      }
    })

    if (user) {
      if (user.account && user.account.email === email)
        throw new HttpError(409, 'Email already registered')
      if (user.username === username) throw new HttpError(409, 'Username already used')
    }

    return true
  } catch (error) {
    if (error instanceof HttpError) throw error

    throw new HttpError(500, 'Internal server error')
  }
}

const createUser = async ({
  email,
  username,
  password,
  roles,
  avatarUrl
}: RegisterRequest & { avatarUrl?: string }) => {
  try {
    // Hash password
    const hashedPassword: string = await bcrypt.hash(<string>password, 10)

    return await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
        user: {
          create: {
            username,
            avatarUrl,
            roles
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            roles: true,
            avatarUrl: true
          }
        }
      }
    })
  } catch (error) {
    throw new HttpError(500, 'Internal server error')
  }
}

const createAccountWithGoogle = async (userData: RegisterByGoogle) => {
  try {
    const { id, username, avatarUrl, email } = userData
    return await prisma.account.create({
      data: {
        email,
        password: 'login with google',
        user: {
          create: {
            id,
            username,
            avatarUrl
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            roles: true,
            avatarUrl: true
          }
        }
      }
    })
  } catch (error) {
    throw new HttpError(500, 'Internal server error')
  }
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserExisted,
  createUser,
  createAccountWithGoogle
}
