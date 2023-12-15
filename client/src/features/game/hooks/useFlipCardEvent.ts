import { useEffectOnce } from 'usehooks-ts'

import { socket } from '~/config/socket'
import { useAppDispatch } from '~/hooks/useRedux'

import { startFlipCardGame } from '../store/gameSlice'

import useOnCalculateScore from './useOnCalculateScore'
import useOnContentNotFound from './useOnContentNotFound'

type PropsType = {
  stackId: string
  gameId: string
  sessionId: string
  userId: string
}

function useFlipCardEvent({ stackId, gameId, sessionId, userId }: PropsType) {
  const dispatch = useAppDispatch()

  const onContentNotFound = useOnContentNotFound(stackId, gameId)
  const onCalculateScore = useOnCalculateScore()

  useEffectOnce(() => {
    const onGameContent = (gameData: GameData<(ImageContent | KanjiContent)[]>) => {
      dispatch(
        startFlipCardGame({
          time: new Date(new Date().getTime() + gameData.time * 1000 + 1000).toString(),
          gameContent: gameData.gameContent,
          score: gameData.score
        })
      )
    }

    socket.emit('game:blind-card-get', { sessionId, userId })

    socket.on('game:blind-card-game-content', onGameContent)

    socket.on('game:content-not-found', onContentNotFound)

    socket.on('game:calculate-score-success', onCalculateScore)

    return () => {
      socket.off('game:blind-card-game-content', onGameContent)
      socket.off('game:content-not-found', onContentNotFound)
      socket.off('game:calculate-score-success', onCalculateScore)
    }
  })
}

export default useFlipCardEvent
