import { FullCreateStackReq } from '../@types/stack'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'
import gameLogService from './game-log.service'

const createStackExample = {
  name: 'Kanji N5',
  description: 'Kanji N5 for beginner',
  thumbnail:
    'https://i0.wp.com/www.kvbro.com/wp-content/uploads/2020/03/91739365_252506499211824_7993183065570541568_n.jpg?resize=800%2C560&ssl=1',
  topic: '035d2bff-038b-41f2-a2fb-be3b429dbccd',
  gameStacks: [
    {
      gameId: 'e3d0c83a-262e-4750-91d3-39bc93cd49d7'
    },
    {
      gameId: '9026eee0-8dec-4827-b0d8-e5475c0090db'
    }
  ],
  kanjis: [
    {
      kanji: '一',
      kunyomi: 'ひと・つ',
      onyomi: 'イチ・イツ',
      kakikata: '一',
      meaning: 'One'
    },
    {
      kanji: '二',
      kunyomi: 'ふた・つ',
      onyomi: 'ニ・ジ',
      kakikata: '二',
      meaning: 'Two'
    }
  ]
}

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
          connect: {
            id: stack.topic
          }
        },
        kanjis: {
          create: stack.kanjis.map(item => ({
            kanji: item.kanji,
            kunyomi: item.kunyomi,
            onyomi: item.onyomi,
            kakikata: item.kakikata,
            meaning: item.meaning,
            vocabularies: {
              create: {
                yomikata: item.vocabularies.yomikata,
                meaning: item.vocabularies.meaning,
                example: {
                  create: {
                    example: item.vocabularies.example.example,
                    meaning: item.vocabularies.example.meaning
                  }
                }
              }
            }
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
          id: followedUserId ?? ''
        }
      },
      gameStacks: {
        select: {
          gameLogs: {
            where: {
              userId: followedUserId ?? ''
            },
            select: {
              archievedPoints: true
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 1
          }
        }
      }
    }
  })

  if (!stacks) throw new HttpError(404, 'No stack found')

  // Normalize data
  const stacksResult = stacks.map(stack => ({
    id: stack.id,
    name: stack.name,
    description: stack.description,
    thumbnail: stack.thumbnail,
    isFollowed: stack.likedBy.length > 0,
    currentUserPoints: stack.gameStacks?.reduce((sum, gameStack) => {
      return sum + (gameStack.gameLogs[0]?.archievedPoints || 0)
    }, 0)
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
