import type { Socket } from 'socket.io'

import flipCardEvent from './events/flip-card.event'
import kanjiShooterEvent from './events/kanji-shooter.event'
import multipleChoiceEvent from './events/multiple-choice.event'

const socketEvent = (socket: Socket) => {
  flipCardEvent(socket)

  kanjiShooterEvent(socket)

  multipleChoiceEvent(socket)
}

export default socketEvent
