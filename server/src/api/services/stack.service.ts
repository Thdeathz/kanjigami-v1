import { CreateStackReq } from '../@types/stack'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const createStack = async (stack: CreateStackReq) => {
  try {
    return await prisma.stack.create({
      data: {
        name: stack.name,
        description: stack.description,
        gameStacks: {
          create: stack.gameStacks.map(gameStack => ({
            gameId: gameStack.gameId
          }))
        },
        topic: {
          connectOrCreate: {
            where: {
              name: stack.topic.name
            },
            create: {
              name: stack.topic.name,
              description: stack.topic.description || 'Default description'
            }
          }
        }
      }
    })
  } catch (error) {
    throw new HttpError(500, 'Internal server error')
  }
}

export default {
  createStack
}
