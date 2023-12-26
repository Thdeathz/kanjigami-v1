import { message } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '~/components/Panel'

import { socket } from '~/config/socket'
import BlindCardGameContent from '~/features/game/BlindFlipCard/GameContent'
import { selectFlipCardGameData } from '~/features/game/store/gameSlice'
import { useAppSelector } from '~/hooks/useRedux'
import CountDown from '../CountDown'
import EventLeaderboards from '../LeaderList/EventLeaderboards'
import useUpdatedCallback from '~/hooks/useUpdatedCallBack'

type PropsType = {
  eventId: string
  roundId: string
  userId: string
  endTime: Date
  leaderboards: ITopUser[]
}

function OnlineBlindCard({ eventId, roundId, userId, endTime, leaderboards }: PropsType) {
  const navigate = useNavigate()
  const gameData = useAppSelector(selectFlipCardGameData)

  const onTimeOut = useUpdatedCallback(() => {
    socket.emit('event:flip-blind-card-calculate-score', {
      eventId,
      roundId,
      userId,
      score: gameData.score
    })
    message.success('Submit result successfully')
    navigate(`/battle/${eventId}`)
  }, [gameData.score])

  return (
    <>
      <div className="w-0 shrink grow">
        <BlindCardGameContent
          gameContent={gameData.gameContent}
          score={gameData.score}
          userId={userId}
          handleCalculateScore={onTimeOut}
        />
      </div>

      <Panel className="my-12 basis-1/5">
        <div className="flex items-center justify-between">
          <p className="mb-4 text-lg font-medium">Leaderboards</p>

          <CountDown endTime={endTime} onFinish={onTimeOut} />
        </div>

        <EventLeaderboards leaderboards={leaderboards} />
      </Panel>
    </>
  )
}

export default OnlineBlindCard
