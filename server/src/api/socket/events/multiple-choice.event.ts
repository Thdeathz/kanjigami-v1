import { Socket } from 'socket.io'

import { GetGameContentRequest, UserSubmitAnswerRequest } from '../@types/game'
import multipleChoiceController from '../controllers/multiple-choice.controller'

const multipleChoiceEvent = (socket: Socket) => {
  socket.on('game:multiple-choice-get', (data: GetGameContentRequest) =>
    multipleChoiceController.handleGetContent(socket, data)
  )

  socket.on('game:multiple-choice-calculate-score', (data: UserSubmitAnswerRequest) =>
    multipleChoiceController.handleSaveScore(socket, data)
  )
}

export default multipleChoiceEvent
