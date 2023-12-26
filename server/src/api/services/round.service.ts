import { UUID } from 'crypto'

import { EventStatus } from '@prisma/client'
import { UpdateRoundReq } from '../@types/round'
import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'

const updateRound = async (id: UUID, { gameId, stackId }: UpdateRoundReq) => {
  try {
    return await prisma.round.update({
      where: {
        id
      },
      data: {
        gameId,
        stackId
      }
    })
  } catch (error) {
    console.log(error)
    throw new HttpError(500, 'Update round failed')
  }
}

const updateRoundStatus = async (roundId: string, status: EventStatus) => {
  return await prisma.round.update({
    where: {
      id: roundId
    },
    data: {
      status
    }
  })
}

const deleteRound = async (id: UUID) => {
  try {
    return await prisma.round.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.log(error)
    throw new HttpError(400, 'Delete round failed')
  }
}

export default {
  updateRound,
  deleteRound,
  updateRoundStatus
}
