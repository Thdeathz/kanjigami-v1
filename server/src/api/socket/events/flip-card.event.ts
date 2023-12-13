import type { Socket } from 'socket.io'

import {
  GetGameContentRequest,
  SaveGameScoreRequest,
  UpdateGameStatusRequest
} from '../@types/game'
import flipCardController from '../controllers/flip-card.controller'

const flipCardEvent = (socket: Socket) => {
  socket.on('game:blind-card-get', (data: GetGameContentRequest) =>
    flipCardController.handleGetGameContent(socket, data)
  )

  socket.on('game:blind-card-update', (data: UpdateGameStatusRequest) =>
    flipCardController.handleUpdateGameStatus(socket, data)
  )

  socket.on('game:calculate-score', (data: SaveGameScoreRequest) =>
    flipCardController.handleCalculateScore(socket, data)
  )
}

export default flipCardEvent
