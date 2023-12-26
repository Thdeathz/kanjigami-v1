import { useEffect, useRef, useState } from 'react'
import { useEffectOnce, useEventListener } from 'usehooks-ts'

import { socket } from '~/config/socket'

import Game from '../KanjiShooter/entities/game'

import useOnCalculateScore from './useOnCalculateScore'
import useOnContentNotFound from './useOnContentNotFound'
import { useDispatch } from 'react-redux'
import { startKanjiShooterGame } from '../store/gameSlice'

type PropsType = {
  stackId: string
  gameId: string
  sessionId: string
  userId: string
}

function useKanjiShooterEvent({ stackId, gameId, sessionId, userId }: PropsType) {
  const dispatch = useDispatch()
  const onContentNotFound = useOnContentNotFound(stackId, gameId)
  const onCalculateScoreSuccess = useOnCalculateScore()

  useEffectOnce(() => {
    const onGameContent = ({ kanjis }: { kanjis: IKanjiShooterContent[] }) => {
      dispatch(startKanjiShooterGame(kanjis))
    }

    socket.emit('game:kanji-shooter-get', { sessionId, userId })

    socket.on('game:kanji-shooter-game-content', onGameContent)

    socket.on('game:content-not-found', onContentNotFound)

    socket.on('game:calculate-score-success', onCalculateScoreSuccess)

    return () => {
      socket.off('game:kanji-shooter-game-content', onGameContent)
      socket.off('game:content-not-found', onContentNotFound)
      socket.off('game:calculate-score-success', onCalculateScoreSuccess)
    }
  })
}

export default useKanjiShooterEvent
