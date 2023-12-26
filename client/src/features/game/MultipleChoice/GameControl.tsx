import React from 'react'

import Loading from '~/components/Loading'

import useMultipleChoiceEvent from '../hooks/useMultipleChoiceEvent'

import MultipleChoiceGameContent from './GameContent'

type PropsType = {
  stackId: string
  gameId: string
  sessionId: string
  userId: string
  gameContent: IMultipleChoiceGameContent[]
  onCalculateScore: () => void
}

function MultipleChoiceGameControl({ stackId, gameId, sessionId, userId, gameContent, onCalculateScore }: PropsType) {
  useMultipleChoiceEvent({ sessionId, userId, stackId, gameId })

  if (!gameContent || gameContent.length === 0) return <Loading className="text-3xl" />

  return <MultipleChoiceGameContent gameContent={gameContent} onCalculateScore={onCalculateScore} />
}

export default MultipleChoiceGameControl
