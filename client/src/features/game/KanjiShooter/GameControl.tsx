import React, { useState } from 'react'
import KanjiShooterGameContent from './GameContent'
import { socket } from '~/config/socket'
import { useAppSelector } from '~/hooks/useRedux'
import { selectKanjiShooterGameData } from '../store/gameSlice'
import Loading from '~/components/Loading'
import useKanjiShooterEvent from '../hooks/useKanjiShooterEvent'
import Game from './entities/game'

type PropsType = {
  sessionId: string
  userId: string
  gameId: string
  stackId: string
}

const KanjiShooterGameControl = ({ sessionId, userId, gameId, stackId }: PropsType) => {
  const gameContent = useAppSelector(selectKanjiShooterGameData)
  const [game, setGame] = useState<Game | null>(null)

  const handleCalculateScore = () => {
    socket.emit('game:kanji-shooter-calculate-score', { sessionId, userId, score: game?.userScore || 0 })
  }

  useKanjiShooterEvent({ sessionId, userId, gameId, stackId })

  if (!gameContent || gameContent.length === 0) return <Loading className="text-3xl" />

  return (
    <KanjiShooterGameContent
      size={{ width: 1600, height: 750 }}
      userId={userId}
      handleCalculateScore={handleCalculateScore}
      gameContent={gameContent}
      game={game}
      setGame={setGame}
    />
  )
}

export default KanjiShooterGameControl
