import { message } from 'antd'
import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'

import GameLayout from '~/components/Layouts/GameLayout'
import Loading from '~/components/Loading'
import Panel from '~/components/Panel'
import { socket } from '~/config/socket'
import useAuth from '~/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'

import {
  selectFlipCardGameData,
  startFlipCardGame,
  startKanjiShooterGame,
  startMultipleChoiceGame
} from '../game/store/gameSlice'

import CountDown from './components/CountDown'
import EventLeaderboards from './components/LeaderList/EventLeaderboards'
import OnlineBlindCard from './components/OngoingBattle/OnlineBlindCard'
import OnlineMultipleChoice from './components/OngoingBattle/OnlineMultipleChoice'
import { useGetBattleDetailQuery } from './store/battleService'
import {
  resetCurrentRound,
  selectBattleLeaderboard,
  selectCurrentRound,
  setCurrentRound,
  updateOnGoingBattleUsers
} from './store/battleSlice'
import OnlineKanjiShooter from './components/OngoingBattle/OnlineKanjiShooter'

function OnlineGame() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id: eventId, roundId } = useParams()
  const { userId } = useAuth()

  const { data: event, isLoading } = useGetBattleDetailQuery(eventId as string)
  const currentRound = useAppSelector(selectCurrentRound)
  const users = useAppSelector(selectBattleLeaderboard)

  useEffectOnce(() => {
    const handleSetRoundContent = ({ round, users }: { round: IBattleRound; users: ITopUser[] }) => {
      dispatch(setCurrentRound(round))
      dispatch(updateOnGoingBattleUsers(users))

      if (round.game.name === 'Multiple Choice') {
        dispatch(
          startMultipleChoiceGame({
            time: round.startTime,
            gameContent: round.gameContent as IMultipleChoiceGameContent[]
          })
        )
      }

      if (round.game.name === 'Blind Flip Card') {
        dispatch(
          startFlipCardGame({
            score: 0,
            time: round.startTime,
            gameContent: round.gameContent as (ImageContent | KanjiContent)[]
          })
        )
      }

      if (round.game.name === 'Kanji Shooter') {
        dispatch(startKanjiShooterGame(round.gameContent as (ImageContent | KanjiContent)[]))
      }
    }

    const handleTurnBack = (returnMsg: string) => {
      message.error({
        content: returnMsg,
        key: `turn-back`,
        duration: 1.5
      })
      navigate(`/battle/${eventId}`)
    }

    const handleUpdateLeaderBoards = ({ users }: { users: ITopUser[] }) => {
      dispatch(updateOnGoingBattleUsers(users))
    }

    socket.emit('event:get-round-content', { eventId, roundId, userId })

    socket.on('event:round-content', handleSetRoundContent)

    socket.on('event:round-ended', () => handleTurnBack(`Round #${currentRound?.order} has ended`))

    socket.on('event:user-not-joined', () => handleTurnBack('You have not joined this event'))

    socket.on('event:leaderboards', handleUpdateLeaderBoards)

    socket.on('event:already-played', () => handleTurnBack(`You have already played round #${currentRound?.order}`))

    return () => {
      dispatch(resetCurrentRound())
      socket.off('event:round-content', handleSetRoundContent)
      socket.off('event:round-ended', () => handleTurnBack(`Round #${currentRound?.order} has ended`))
      socket.off('event:user-not-joined', () => handleTurnBack('You have not joined this event'))
      socket.off('event:leaderboards', handleUpdateLeaderBoards)
      socket.off('event:already-played', () => handleTurnBack(`You have already played round #${currentRound?.order}`))
    }
  })

  if (isLoading || !event || !currentRound || !currentRound.gameContent || !currentRound.startTime)
    return (
      <GameLayout>
        <Loading className="text-3xl" />
      </GameLayout>
    )

  return (
    <GameLayout
      breadcrumbs={[
        {
          label: (
            <div className="flex-center gap-2">
              <RiSwordFill /> Online battles
            </div>
          ),
          to: '/battles'
        },
        {
          label: <p>{event.title}</p>,
          to: `/battle/${event.id}`
        },
        {
          label: <p>Round #{currentRound.order + 1}</p>,
          to: `/battle/${event.id}/${currentRound.id}`
        }
      ]}
    >
      <div className="flex h-full w-full items-start justify-between gap-6">
        {currentRound.game.name === 'Multiple Choice' && (
          <OnlineMultipleChoice
            eventId={eventId as string}
            roundId={roundId as string}
            userId={userId}
            endTime={new Date(new Date(currentRound.startTime).getTime() + 1 * 58 * 1000)}
            leaderboards={users}
          />
        )}

        {currentRound.game.name === 'Blind Flip Card' && (
          <OnlineBlindCard
            eventId={eventId as string}
            roundId={roundId as string}
            userId={userId}
            endTime={new Date(new Date(currentRound.startTime).getTime() + 1 * 58 * 1000)}
            leaderboards={users}
          />
        )}

        {currentRound.game.name === 'Kanji Shooter' && (
          <OnlineKanjiShooter
            eventId={eventId as string}
            roundId={roundId as string}
            userId={userId}
            endTime={new Date(new Date(currentRound.startTime).getTime() + 1 * 58 * 1000)}
            leaderboards={users}
          />
        )}
      </div>
    </GameLayout>
  )
}

export default OnlineGame
