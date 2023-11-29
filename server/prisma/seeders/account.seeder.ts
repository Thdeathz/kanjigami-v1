import { Account, User } from '@prisma/client'

import prisma from './prismaClient'
import { accountFactory } from '../factories/account.factory'

export type AccountWithUser = Account & { user: User }

const accountSeeder = async (): Promise<AccountWithUser[]> => {
  console.log('🌱 Seeding accounts...')
  let accounts: AccountWithUser[] = []
  const accountsData = await accountFactory()

  await prisma.account.create({
    data: {
      email: 'admin@gmail.com',
      password: '$2b$10$S1DyrPjcRntNMjTdhAyeXu5zfp9EB0xyvLOvy90/LQTmTd75zdfqa',
      user: {
        create: {
          username: 'ADMIN',
          avatarUrl:
            'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/admin-avatar.jpg',
          rankingScore: 0,
          roles: ['ADMIN']
        }
      }
    },
    include: {
      user: true
    }
  })

  await Promise.all(
    accountsData.map(async each => {
      const newAccount = await prisma.account.create({
        data: {
          email: each.email,
          password: each.password,
          user: {
            create: {
              username: each.username,
              avatarUrl: each.avatarUrl,
              rankingScore: each.rankingScore
            }
          }
        },
        include: {
          user: true
        }
      })

      accounts.push(newAccount)
    })
  )

  console.log('🌱 Seeding accounts completed!')

  return accounts
}

export default accountSeeder
