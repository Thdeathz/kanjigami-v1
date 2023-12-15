import type { Socket } from 'socket.io'

import { GetGameContentRequest } from '../@types/game'
import kanjiShooterContoller from '../controllers/kanji-shooter.contoller'

const kanjiShooterEvent = (socket: Socket) => {
  socket.on('game:kanji-shooter-get', (data: GetGameContentRequest) =>
    kanjiShooterContoller.handleGetContent(socket, data)
  )

  socket.on(
    'game:kanji-shooter-calculate-score',
    (data: GetGameContentRequest & { score: number }) =>
      kanjiShooterContoller.handleSaveScore(socket, data)
  )
}

export default kanjiShooterEvent
