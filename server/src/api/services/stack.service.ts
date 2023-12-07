import { FullCreateStackReq } from '../@types/stack'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'
import gameLogService from './game-log.service'

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

const getAllStacks = async (page: number, offset: number, followedUserId?: string) => {
  const total = await prisma.stack.count()

  const stacks = await prisma.stack.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      name: true,
      description: true,
      thumbnail: true,
      likedBy: {
        where: {
          id: followedUserId
        }
      }
    }
  })

  if (!stacks) throw new HttpError(404, 'No stack found')

  // Normalize data
  const stacksResult = stacks.map(stack => ({
    ...stack,
    isFollowed: stack.likedBy.length > 0
  }))

  return { stacks: stacksResult, total }
}

const getStackById = async (id: string) => {
  const stack = await prisma.stack.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      description: true,
      thumbnail: true,
      kanjis: {
        select: {
          id: true,
          kanji: true
        }
      }
    }
  })

  if (!stack) throw new HttpError(404, 'Stack not found')

  const leaderboards = await gameLogService.getLeaderboards(stack.id, 10)

  return { ...stack, leaderboards }
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
      description: true,
      thumbnail: true
    }
  })

  if (!followedStacks) throw new HttpError(404, 'No stack found')

  return followedStacks
}

const setFollowStack = async (userId: string, stackId: string) => {
  const isFollowed = await prisma.stack.findUnique({
    where: {
      id: stackId
    },
    select: {
      likedBy: {
        where: {
          id: userId
        }
      }
    }
  })

  if (isFollowed?.likedBy.length) {
    return await prisma.stack.update({
      where: {
        id: stackId
      },
      data: {
        likedBy: {
          disconnect: {
            id: userId
          }
        }
      },
      select: {
        id: true
      }
    })
  }

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
    },
    select: {
      id: true
    }
  })
}

const searchByName = async (searchValue: string) => {
  const stack = await prisma.stack.findMany({
    where: {
      name: {
        search: searchValue
      }
    },
    select: {
      id: true,
      name: true,
      thumbnail: true
    }
  })

  return stack
}

const adminGetAllStacks = async (page: number, offset: number) => {
  const total = await prisma.stack.count()

  const stacks = await prisma.stack.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      name: true,
      description: true,
      thumbnail: true,
      _count: {
        select: {
          kanjis: true,
          likedBy: true
        }
      }
    }
  })

  if (!stacks) throw new HttpError(404, 'No stack found')

  // Normalize data
  const stacksResult = stacks.map(stack => ({
    ...stack,
    totalKanjis: stack._count.kanjis,
    totalFollowers: stack._count.likedBy
  }))

  return { stacks: stacksResult, total }
}

export default {
  createStack,
  getAllStacks,
  getStackById,
  getFollowedStacks,
  setFollowStack,
  searchByName,
  adminGetAllStacks
}
