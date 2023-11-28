import { FullCreateStackReq } from '../@types/stack'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const createStack = async (stack: FullCreateStackReq) => {
  try {
    return await prisma.stack.create({
      data: {
        name: stack.name,
        description: stack.description,
        thumbnail: stack.thumbnail,
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
              description: stack.topic.description
            }
          }
        },
        kanjis: {
          create: stack.kanjis.map(item => ({
            kanji: item.kanji,
            kunyomi: item.kunyomi,
            onyomi: item.onyomi,
            meaning: item.meaning
          }))
        }
      }
    })
  } catch (error) {
    throw new HttpError(500, 'Internal server error')
  }
}

const getAllStacks = async (page: number, offset: number) => {
  const stacks = await prisma.stack.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      name: true,
      description: true,
      thumbnail: true
    }
  })

  return stacks
}

const getFollowedStacks = async (userId: string) => {
  const followedStacks = await prisma.stack.findMany({
    where: {
      likedBy: {
        some: {
          id: userId
        }
      }
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  })
  return followedStacks
}

const setFollowStack = async (userId: string, stackId: string) => {
  try {
    const followedStacks = getFollowedStacks(userId)
    if (!(await followedStacks).find(stack => stack.id === stackId)) {
      return await prisma.stack.update({
        where: {
          id: stackId
        },
        data: {
          likedBy: {
            connect: {
              id: userId
            }
          }
        }
      })
    }
  } catch (error) {
    throw new HttpError(500, 'Stack not found')
  }
}

export default {
  createStack,
  getAllStacks,
  getFollowedStacks,
  setFollowStack
}
