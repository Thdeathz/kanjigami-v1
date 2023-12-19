import bcrypt from 'bcrypt'

import prisma from '../databases/init.prisma'
import { RegisterByGoogle, RegisterRequest } from '../@types/user'
import HttpError from '../helpers/httpError'

const getAllUsers = async (page: number, offset: number) => {
  const total = await prisma.user.count()

  const users = await prisma.user.findMany({
    skip: (page - 1) * offset,
    take: offset,
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
      },
      _count: {
        select: {
          gameLogs: true,
          onlineHistory: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!users) throw new HttpError(404, 'Not found')

  // Normalize data
  const usersResult = users.map(user => ({
    ...user,
    totalGames: user._count.gameLogs + user._count.onlineHistory
  }))

  return { users: usersResult, total }
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
      id: true,
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

const getUserStats = async (userId: string) => {
  const stackStats = await prisma.gameLog.aggregate({
    where: {
      userId
    },
    _sum: {
      archievedPoints: true
    },
    _count: {
      archievedPoints: true
    }
  })

  const onlineStats = await prisma.onlineHistory.aggregate({
    where: {
      userId
    },
    _sum: {
      archievedPoints: true
    },
    _count: {
      archievedPoints: true
    }
  })

  if (!stackStats || !onlineStats) throw new HttpError(404, 'User Not found')

  return {
    stackStats: {
      totalGames: stackStats._count.archievedPoints ?? 0,
      totalPoints: stackStats._sum.archievedPoints ?? 0
    },
    onlineStats: {
      totalGames: onlineStats._count.archievedPoints ?? 0,
      totalPoints: onlineStats._sum.archievedPoints ?? 0
    }
  }
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
        throw new HttpError(409, 'Conflict/EmailExisted')
      if (user.username === username) throw new HttpError(409, 'Conflict/UsernameExisted')
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
}

const createAccountWithGoogle = async (userData: RegisterByGoogle) => {
  const { id, username, avatarUrl, email } = userData
  const userInfo = await prisma.account.create({
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

  if (!userInfo) throw new HttpError(500, 'Internal server error')

  return userInfo
}

const resetPassword = async (accountId: string, password: string) => {
  return await prisma.account.update({
    where: { id: accountId },
    data: {
      password: await bcrypt.hash(password, 10)
    }
  })
}

const updateAvatar = async (userId: string, avatarUrl: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      avatarUrl
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
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserExisted,
  createUser,
  createAccountWithGoogle,
  resetPassword,
  updateAvatar,
  getUserStats
}
