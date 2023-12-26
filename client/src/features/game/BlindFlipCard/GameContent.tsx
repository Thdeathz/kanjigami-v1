import { motion } from 'framer-motion'
import React, { MouseEvent, useState } from 'react'

import { cardList } from '~/config/variants'

import useActiveCardChanges from '../hooks/useActiveCardChanges'

import Card from './Card'

type PropsType = {
  userId: string
  sessionId?: string
  score: number
  gameContent: (ImageContent | KanjiContent)[]
  handleCalculateScore?: () => void
}

function BlindCardGameContent({ userId, sessionId, score, gameContent, handleCalculateScore }: PropsType) {
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

  useActiveCardChanges({ activedCard, setActivedCard, userId, sessionId, score, handleCalculateScore })

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

export default BlindCardGameContent
