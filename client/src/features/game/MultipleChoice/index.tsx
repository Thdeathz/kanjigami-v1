import React from 'react'
import { GiArchiveRegister } from 'react-icons/gi'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { socket } from '~/config/socket'
import useAuth from '~/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'

import GameEnd from '../components/GameEnd'
import GameLobby from '../components/GameLobby'
import GameStatus from '../components/GameStatus'
import { useStartGameMutation } from '../store/gameService'
import { resetMultipleChoiceState, selectMultipleChoiceGameData } from '../store/gameSlice'

import MultipleChoiceGame from './Game'

type PropsType = {
  game: IGame
  stack: IStackDetail
}

function MultipleChoice({ game, stack }: PropsType) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session')
  const logId = searchParams.get('log')
  const { userId } = useAuth()

  const [startGame, { isLoading: onStartLoading }] = useStartGameMutation()

  const gameData = useAppSelector(selectMultipleChoiceGameData)

  const onStart = async () => {
    try {
      const sessionId = await startGame({
        gameId: game.id,
        stackId: stack.id,
        numberKanji: 10,
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

  const onCalculateScore = () => {
    if (!sessionId) return

    socket.emit('game:multiple-choice-calculate-score', { sessionId, userId, gameContent: gameData.gameContent })

    dispatch(resetMultipleChoiceState({}))
  }

  if (sessionId)
    return (
      <>
        <GameStatus
          time={gameData.time}
          score={gameData.gameContent.filter(item => item.selectedAnswer !== undefined).length}
          maxScore={gameData.gameContent.length}
          onTimeOut={onCalculateScore}
        />

        <MultipleChoiceGame
          sessionId={sessionId}
          stackId={stack.id}
          gameId={game.id}
          userId={userId}
          gameContent={gameData.gameContent}
          onCalculateScore={onCalculateScore}
        />
      </>
    )

  if (logId) return <GameEnd icon={<GiArchiveRegister />} title={game.name} logId={logId} onRestart={onStart} />

  return (
    <GameLobby
      icon={<GiArchiveRegister />}
      title={game.name}
      stackName={stack.name}
      onStart={onStart}
      time="05:00"
      isLoading={onStartLoading}
    />
  )
}

export default MultipleChoice
