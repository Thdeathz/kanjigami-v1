import React from 'react'
import { GiCardExchange } from 'react-icons/gi'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { socket } from '~/config/socket'
import useAuth from '~/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'

import GameEnd from '../components/GameEnd'
import GameLobby from '../components/GameLobby'
import GameStatus from '../components/GameStatus'
import { useStartGameMutation } from '../store/gameService'
import { resetFlipCardState, selectFlipCardGameData } from '../store/gameSlice'

import BlindCardGameControl from './GameControl'

type PropsType = {
  game: IGame
  stack: IStackDetail
}

function BlindFlipCard({ game, stack }: PropsType) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session')
  const logId = searchParams.get('log')
  const { userId } = useAuth()

  const [startGame, { isLoading: onStartLoading }] = useStartGameMutation()

  const gameData = useAppSelector(selectFlipCardGameData)

  const onStart = async () => {
    try {
      const sessionId = await startGame({
        gameId: game.id,
        stackId: stack.id,
        numberKanji: 12,
        time: 60 * 5
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

  const onTimeOut = () => {
    if (!sessionId) return

    socket.emit('game:calculate-score', {
      userId,
      gameId: game.id,
      stackId: stack.id,
      sessionId,
      score: gameData.score
    })

    dispatch(resetFlipCardState({}))
  }

  if (sessionId)
    return (
      <>
        <GameStatus time={gameData.time} score={gameData.score} maxScore={12} onTimeOut={onTimeOut} />

        <BlindCardGameControl
          userId={userId}
          sessionId={sessionId}
          stackId={stack.id}
          gameId={game.id}
          gameContent={gameData.gameContent}
          score={gameData.score}
        />
      </>
    )

  if (logId) return <GameEnd icon={<GiCardExchange />} title={game.name} logId={logId} onRestart={onStart} />

  return (
    <GameLobby
      icon={<GiCardExchange />}
      title={game.name}
      stackName={stack.name}
      time="05:00"
      onStart={onStart}
      isLoading={onStartLoading}
    />
  )
}

export default BlindFlipCard
