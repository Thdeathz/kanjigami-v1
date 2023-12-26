import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'

import Button from '~/components/Button'
import Loading from '~/components/Loading'
import Panel from '~/components/Panel'
import { socket } from '~/config/socket'
import { onlineBattleStatus } from '~/config/status'
import useAuth from '~/hooks/useAuth'
import { useAppSelector } from '~/hooks/useRedux'

import { selectOngoingBattle, updateOnGoingBattleData, updateOnGoingBattleUsers } from '../../store/battleSlice'
import EventLeaderboards from '../LeaderList/EventLeaderboards'
import OnlineCard from '../OnlineCard'

import LobbyList from './LobbyList'

type PropsType = {
  eventId: string
  refetch: () => void
}

function OngoingBattle({ eventId, refetch }: PropsType) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId } = useAuth()
  const { data: battleData, users: joinedUser } = useAppSelector(selectOngoingBattle)

  const isFirstRoundStarted = battleData?.rounds[0].status !== onlineBattleStatus.UPCOMING

  const onJoinLobby = () => {
    if (isFirstRoundStarted) return

    socket.emit('event:join-lobby', { eventId, userId })
  }

  useEffectOnce(() => {
    const handleInitEventData = ({ event, users }: { event: IOnlineBattle; users: ITopUser[] }) => {
      dispatch(updateOnGoingBattleData(event))
      dispatch(updateOnGoingBattleUsers(users))
    }

    const handleRoundStarted = () => {
      socket.emit('event:join', { eventId, userId })
    }

    const handleUpdateEvent = ({ event }: { event: IOnlineBattle }) => {
      dispatch(updateOnGoingBattleData(event))
    }

    const handleLeaderBoards = ({ users }: { users: ITopUser[] }) => {
      dispatch(updateOnGoingBattleUsers(users))
    }

    const handleEventEnded = () => {
      refetch()
    }

    socket.emit('event:join', { eventId, userId })

    socket.on('event:round-started', handleRoundStarted)

    socket.on('event:joined', handleInitEventData)

    socket.on('event:leaderboards', handleLeaderBoards)

    socket.on('event:finished', handleEventEnded)

    return () => {
      socket.off('event:round-started', handleRoundStarted)
      socket.off('event:joined', handleUpdateEvent)
      socket.off('event:leaderboards', handleLeaderBoards)
      socket.off('event:finished', handleEventEnded)
    }
  })

  if (!battleData) return <Loading className="mt-36 text-3xl" />

  return (
    <div className="mt-12 flex w-full items-start justify-start gap-12">
      <div className="w-full grow">
        <Panel>
          <div className="grid grid-cols-8 gap-3">
            {battleData.rounds.map((round, index) => (
              <Button
                key={`kanji-item-${index}`}
                type={round.status !== onlineBattleStatus.UPCOMING ? 'green' : 'default'}
              >
                {round.stack.name}
              </Button>
            ))}
          </div>
        </Panel>

        <div className="card-list group pointer-events-none mt-6 grid w-full auto-rows-fr grid-cols-auto-fill gap-6">
          {battleData.rounds.map(round => (
            <OnlineCard
              key={`round-card-${round.id}`}
              round={round}
              onClick={() => navigate(`/battle/${eventId}/${round.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="basis-1/4">
        {!isFirstRoundStarted ? (
          <>
            <Button type="primary" className="w-full" onClick={onJoinLobby}>
              Join lobby ({joinedUser.length} / {battleData.maxPlayers})
            </Button>
            <p className="mb-4 text-xl font-semibold">Lobby</p>

            <LobbyList users={joinedUser} />
          </>
        ) : (
          <>
            <p className="mb-4 text-xl font-semibold">Battle leaders</p>

            <EventLeaderboards leaderboards={joinedUser} />
          </>
        )}
      </div>
    </div>
  )
}

export default OngoingBattle
