import { CreateUpdateGameLogReq } from '../@types/gamelog'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const select = {
  gameStack: {
    select: {
      stack: {
        select: {
          name: true
        }
      },
      game: {
        select: {
          name: true
        }
      }
    }
  },
  user: {
    select: {
      username: true,
      avatarUrl: true
    }
  },
  archievedPoints: true
}

const getAllGameLog = async () => {
  try {
    return await prisma.gameLog.findMany({
      select
    })
  } catch (error) {
    throw new HttpError(500, 'Internal Server Error')
  }
}

const createGameLog = async (userId: string, gameLog: CreateUpdateGameLogReq) => {
  try {
    return await prisma.gameLog.create({
      data: {
        archievedPoints: gameLog.archievedPoints,
        user: {
          connect: {
            id: userId
          }
        },
        gameStack: {
          connect: {
            id: gameLog.gameStackId
          }
        }
      },
      select
    })
  } catch (error) {
    throw new HttpError(500, 'Create gamelog failed')
  }
}

const updateGameLog = async (userId: string, gameLog: CreateUpdateGameLogReq) => {
  try {
    return await prisma.gameLog.update({
      where: {
        gameStackId_userId: {
          gameStackId: gameLog.gameStackId,
          userId: userId
        }
      },
      data: {
        archievedPoints: gameLog.archievedPoints
      },
      select
    })
  } catch (error) {
    throw new HttpError(500, 'Internal Server Error')
  }
}

export default {
  getAllGameLog,
  createGameLog,
  updateGameLog
}
