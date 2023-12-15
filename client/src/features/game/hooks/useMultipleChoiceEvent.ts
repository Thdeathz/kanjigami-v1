import { useEffectOnce } from 'usehooks-ts'

import { socket } from '~/config/socket'
import { useAppDispatch } from '~/hooks/useRedux'

import { startMultipleChoiceGame } from '../store/gameSlice'

import useOnCalculateScore from './useOnCalculateScore'
import useOnContentNotFound from './useOnContentNotFound'

type PropsType = {
  stackId: string
  gameId: string
  sessionId: string
  userId: string
}

function useMultipleChoiceEvent({ stackId, gameId, sessionId, userId }: PropsType) {
  const dispatch = useAppDispatch()
  const onContentNotFound = useOnContentNotFound(stackId, gameId)
  const onCalculateScoreSuccess = useOnCalculateScore()

  useEffectOnce(() => {
    const onGameContent = (gameData: GameData<IMultipleChoiceGameContent[]>) => {
      dispatch(
        startMultipleChoiceGame({
          time: new Date(new Date().getTime() + gameData.time * 1000 + 1000).toString(),
          gameContent: gameData.gameContent
        })
      )
    }

    socket.emit('game:multiple-choice-get', { sessionId, userId })

    socket.on('game:multiple-choice-content', onGameContent)

    socket.on('game:content-not-found', onContentNotFound)

    socket.on('game:calculate-score-success', onCalculateScoreSuccess)

    return () => {
      socket.off('game:multiple-choice-content', onGameContent)
      socket.off('game:content-not-found', onContentNotFound)
      socket.off('game:calculate-score-success', onCalculateScoreSuccess)
    }
  })
}

export default useMultipleChoiceEvent
