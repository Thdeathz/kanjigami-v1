import { motion } from 'framer-motion'
import React, { MouseEvent, useState } from 'react'

import Loading from '~/components/Loading'
import { cardList } from '~/config/variants'

import useActiveCardChanges from '../hooks/useActiveCardChanges'
import useFlipCardEvent from '../hooks/useFlipCardEvent'

import Card from './Card'

type ActivedCard = {
  card: EventTarget & HTMLDivElement
  kanji: ImageContent | KanjiContent
}

type PropsType = {
  gameContent: (ImageContent | KanjiContent)[]
  userId: string
  sessionId: string
  score: number
  stackId: string
  gameId: string
}

function BlindCardGame({ gameContent, userId, sessionId, stackId, gameId, score }: PropsType) {
  const [activedCard, setActivedCard] = useState<ActivedCard[]>([])

  const handleCardClick = (e: MouseEvent<HTMLDivElement>, kanji: ImageContent | KanjiContent) => {
    if (activedCard.length === 2) return

    const { currentTarget } = e
    currentTarget.classList.add('flip')

    setActivedCard([
      ...activedCard,
      {
        card: currentTarget,
        kanji
      }
    ])
  }

  useActiveCardChanges({ activedCard, setActivedCard, userId, sessionId, score })
  useFlipCardEvent({ userId, sessionId, stackId, gameId })

  if (!gameContent || gameContent.length === 0) return <Loading className="text-3xl" />

  return (
    <motion.div
      className="grid h-game-content w-full select-none grid-cols-6 grid-rows-4 gap-3"
      variants={cardList.container}
      initial="hidden"
      animate="enter"
    >
      {gameContent.map((kanji, index) => (
        <Card key={`flip-blind-card-${index}`} kanji={kanji} onClick={e => handleCardClick(e, kanji)} />
      ))}
    </motion.div>
  )
}

export default BlindCardGame
