import React from 'react'
import { GiBulletBill } from 'react-icons/gi'
import { useNavigate, useSearchParams } from 'react-router-dom'

import useAuth from '~/hooks/useAuth'

import GameEnd from '../components/GameEnd'
import GameLobby from '../components/GameLobby'
import { useStartGameMutation } from '../store/gameService'

import KanjiShooterGame from './KanjiShooterGame'

type PropsType = {
  game: IGame
  stack: IStackDetail
}

function KanjiShooter({ game, stack }: PropsType) {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session')
  const logId = searchParams.get('log')
  const { userId } = useAuth()

  const [startGame, { isLoading: onStartLoading }] = useStartGameMutation()

  const onStart = async () => {
    try {
      const sessionId = await startGame({
        gameId: game.id,
        stackId: stack.id,
        numberKanji: 0,
        time: 60 * 30
      }).unwrap()

      navigate(
        `?${new URLSearchParams({
          session: sessionId
        })}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (sessionId) return <KanjiShooterGame sessionId={sessionId} userId={userId} stackId={stack.id} gameId={game.id} />

  if (logId) return <GameEnd icon={<GiBulletBill />} title={game.name} logId={logId} onRestart={onStart} />

  return (
    <GameLobby
      icon={<GiBulletBill />}
      title={game.name}
      stackName={stack.name}
      life={5}
      onStart={onStart}
      isLoading={onStartLoading}
    />
  )
}

export default KanjiShooter
