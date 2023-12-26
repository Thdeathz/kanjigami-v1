import { message } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '~/components/Panel'

import { socket } from '~/config/socket'
import KanjiShooterGameContent from '~/features/game/KanjiShooter/GameContent'
import { selectKanjiShooterGameData } from '~/features/game/store/gameSlice'
import { useAppSelector } from '~/hooks/useRedux'
import CountDown from '../CountDown'
import EventLeaderboards from '../LeaderList/EventLeaderboards'
import Game from '~/features/game/KanjiShooter/entities/game'
import useUpdatedCallback from '~/hooks/useUpdatedCallBack'

type PropsType = {
  eventId: string
  roundId: string
  userId: string
  endTime: Date
  leaderboards: ITopUser[]
}

function OnlineKanjiShooter({ eventId, roundId, userId, endTime, leaderboards }: PropsType) {
  const navigate = useNavigate()
  const gameContent = useAppSelector(selectKanjiShooterGameData)
  const [game, setGame] = useState<Game | null>(null)

  const handleCalculateScore = useUpdatedCallback(() => {
    socket.emit('event:kanji-shooter-calculate-score', {
      eventId,
      roundId,
      userId,
      score: game?.userScore || 0
    })
    message.success('Submit result successfully')
    navigate(`/battle/${eventId}`)
  }, [game])

  return (
    <>
      <div className="w-0 shrink grow">
        <KanjiShooterGameContent
          size={{ width: 1200, height: 650 }}
          userId={userId}
          gameContent={gameContent}
          handleCalculateScore={handleCalculateScore}
          game={game}
          setGame={setGame}
        />
      </div>

      <Panel className="my-12 basis-1/5">
        <div className="flex items-center justify-between">
          <p className="mb-4 text-lg font-medium">Leaderboards</p>

          <CountDown endTime={endTime} onFinish={handleCalculateScore} />
        </div>

        <EventLeaderboards leaderboards={leaderboards} />
      </Panel>
    </>
  )
}

export default OnlineKanjiShooter
