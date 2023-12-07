import { motion } from 'framer-motion'
import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CardBackground from '~/assets/card-background.gif'
import Image from '~/components/Image'
import { useGetFlipCardGameContentQuery } from './store/gameService'
import Loading from '~/components/Loading'
import { getContentArray } from './utils/shuffleContent'

type ActivedCard = {
  card: EventTarget & HTMLDivElement
  kanji: ImageContent | KanjiContent
}

const cardList = {
  container: {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { y: -10, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.05
      }
    },
    exit: {
      y: 10,
      opacity: 0
    }
  }
}

type PropsType = {
  setStatus: React.Dispatch<React.SetStateAction<GameStatusType>>
}

function BlindCardGame({ setStatus }: PropsType) {
  const { stackId } = useParams()
  const { data, isLoading } = useGetFlipCardGameContentQuery(stackId as string)

  const [activedCard, setActivedCard] = useState<ActivedCard[]>([])
  const [gameContent, setGameContent] = useState<(ImageContent | KanjiContent)[]>([])

  const handleCardClick = (e: MouseEvent<HTMLDivElement>, kanji: ImageContent | KanjiContent) => {
    if (activedCard.length === 2) return

    const { currentTarget } = e
    currentTarget.classList.add('flip')

    setActivedCard([
      ...activedCard,
      {
        card: currentTarget,
        kanji: kanji
      }
    ])
  }

  useEffect(() => {
    if (data) {
      setGameContent(getContentArray(data))
    }
  }, [data])

  useEffect(() => {
    if (activedCard.length === 2) {
      const [firstCard, secondCard] = activedCard

      if (firstCard.kanji.id === secondCard.kanji.id) {
        setTimeout(() => {
          firstCard.card.classList.add('invisible')
          secondCard.card.classList.add('invisible')
          setActivedCard(prev => prev.filter(each => each.kanji.id !== firstCard.kanji.id))
          setStatus(prev => ({ ...prev, score: prev.score + 1 }))
        }, 100)
      }

      setTimeout(() => {
        firstCard.card.classList.remove('flip')
        secondCard.card.classList.remove('flip')
        setActivedCard(prev =>
          prev.filter(each => each.kanji.id !== firstCard.kanji.id && each.kanji.id !== secondCard.kanji.id)
        )
        setStatus(prev => ({ ...prev, life: prev.life - 1 }))
      }, 650)
    }
  }, [activedCard])

  if (isLoading || !data) return <Loading className="text-3xl" />

  return (
    <motion.div
      className="grid h-game-content w-full select-none grid-cols-6 grid-rows-4 gap-3"
      variants={cardList.container}
      initial="hidden"
      animate="enter"
    >
      {gameContent.map((kanji, index) => (
        <motion.div
          key={`flip-blind-card-${index}`}
          className="card relative cursor-pointer active:scale-95"
          onClick={e => handleCardClick(e, kanji)}
          variants={cardList.item}
        >
          <div className="card-front absolute aspect-ratio h-full w-full rounded-lg bg-white">
            {kanji.type === 'image' && (
              <div className="relative h-full w-full">
                <Image src={kanji.image} className="h-full w-full rounded-lg object-cover object-center" />

                <p className="absolute left-10 top-10 z-10 bg-white text-2xl text-text-light opacity-50">
                  {kanji.kunyomi}
                </p>
              </div>
            )}

            {kanji.type === 'kanji' && (
              <div className="flex-center h-full text-2xl text-text-heading-light">
                <p>{kanji.kanji}</p>
              </div>
            )}
          </div>

          <div className="card-back absolute aspect-ratio h-full w-full">
            <Image src={CardBackground} className="h-full w-full rounded-lg object-cover object-top" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default BlindCardGame
