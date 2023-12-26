import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '~/components/Panel'

import { socket } from '~/config/socket'
import MultipleChoiceGameContent from '~/features/game/MultipleChoice/GameContent'
import { selectMultipleChoiceGameData } from '~/features/game/store/gameSlice'
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

function OnlineMultipleChoice({ eventId, roundId, userId, endTime, leaderboards }: PropsType) {
  const navigate = useNavigate()
  const gameData = useAppSelector(selectMultipleChoiceGameData)

  const handleCalculateScore = useUpdatedCallback(() => {
    socket.emit('event:multiple-choice-calculate-score', {
      eventId,
      roundId,
      userId,
      answers: gameData.gameContent
    })
    message.success('Submit result successfully')
    navigate(`/battle/${eventId}`)
  }, [gameData.gameContent])

  return (
    <>
      <div className="w-0 shrink grow">
        <MultipleChoiceGameContent gameContent={gameData.gameContent} onCalculateScore={handleCalculateScore} />
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

export default OnlineMultipleChoice
