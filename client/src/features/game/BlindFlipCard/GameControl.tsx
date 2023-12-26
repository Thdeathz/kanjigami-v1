import React from 'react'

import Loading from '~/components/Loading'

import useFlipCardEvent from '../hooks/useFlipCardEvent'

import BlindCardGameContent from './GameContent'

type PropsType = {
  gameContent: (ImageContent | KanjiContent)[]
  userId: string
  sessionId: string
  score: number
  stackId: string
  gameId: string
}

function BlindCardGameControl({ gameContent, userId, sessionId, stackId, gameId, score }: PropsType) {
  useFlipCardEvent({ userId, sessionId, stackId, gameId })

  if (!gameContent || gameContent.length === 0) return <Loading className="text-3xl" />

  return <BlindCardGameContent userId={userId} sessionId={sessionId} score={score} gameContent={gameContent} />
}

export default BlindCardGameControl
