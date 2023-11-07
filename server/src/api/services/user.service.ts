import bcrypt from 'bcrypt'

import prisma from '~/config/init.prisma'
import { RegisterRequest } from '../@types/user'

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      roles: true
    }
  })
}

const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } })
}

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}

const getUserByRefreshToken = async (refreshToken: string) => {
  return await prisma.user.findFirst({ where: { refreshToken } })
}

const createUser = async ({ email, password, roles }: RegisterRequest) => {
  // Hash password
  const hashedPassword: string = await bcrypt.hash(<string>password, 10)
  const userObject: RegisterRequest =
    !Array.isArray(roles) || !roles.length
      ? { email, password: hashedPassword }
      : { email, password: hashedPassword, roles }

  return await prisma.user.create({ data: userObject })
}

const createUserWithGoogle = async (id: string, email: string) => {
  return await prisma.user.create({
    data: {
      id,
      email,
      password: 'login with google'
    }
  })
}

const updateUserRefreshToken = async (email: string, refreshToken: string) => {
  return await prisma.user.update({ where: { email }, data: { refreshToken } })
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByRefreshToken,
  createUser,
  createUserWithGoogle,
  updateUserRefreshToken
}
