import { Account, PrismaClient, User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { accountFactory } from '../factories/account.factory'

const prisma = new PrismaClient()

export type AccountWithUser = Account & { user: User }

const accountSeeder = async (): Promise<AccountWithUser[]> => {
  let accounts: AccountWithUser[] = []
  const accountsData = await accountFactory()

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

  return accounts
}

export default accountSeeder
