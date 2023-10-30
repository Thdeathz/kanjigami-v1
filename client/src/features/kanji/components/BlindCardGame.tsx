import React, { MouseEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import CardBackground from '~/assets/card-background.gif'
import Image from '~/components/Image'

type ActivedCard = {
  card: EventTarget & HTMLDivElement
  id: number
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

const BlindCardGame = () => {
  const [activedCard, setActivedCard] = useState<ActivedCard[]>([])

  const handleCardClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (activedCard.length === 2) return

    const currentTarget = e.currentTarget
    currentTarget.classList.add('flip')

    setActivedCard([
      ...activedCard,
      {
        card: currentTarget,
        id: index
      }
    ])
  }

  useEffect(() => {
    if (activedCard.length === 2) {
      const [firstCard, secondCard] = activedCard

      if (firstCard.id + 1 === secondCard.id) {
        setTimeout(() => {
          firstCard.card.classList.add('invisible')
          secondCard.card.classList.add('invisible')
          setActivedCard(prev =>
            prev.filter(each => each.id !== firstCard.id && each.id !== secondCard.id)
          )
        }, 100)
      }

      setTimeout(() => {
        firstCard.card.classList.remove('flip')
        secondCard.card.classList.remove('flip')
        setActivedCard(prev =>
          prev.filter(each => each.id !== firstCard.id && each.id !== secondCard.id)
        )
      }, 650)
      return
    }
  }, [activedCard])

  return (
    <motion.div
      className="grid h-game-content select-none grid-cols-6 grid-rows-4 gap-3"
      variants={cardList.container}
      initial="hidden"
      animate="enter"
    >
      {Array.from(Array(24).keys()).map((_, index) => (
        <motion.div
          key={`flip-blind-card-${index}`}
          className="card relative cursor-pointer active:scale-95"
          onClick={e => handleCardClick(e, index)}
          variants={cardList.item}
        >
          <div className="card-front absolute aspect-ratio h-full w-full rounded-lg bg-white">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/dff2f91cc457f5086342ee614bc65296.png?alt=media&token=66eabd45-d46a-4e7c-9b9b-b30caee232a9"
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>

          <div className="card-back absolute aspect-ratio h-full w-full">
            <Image
              src={CardBackground}
              className="h-full w-full rounded-lg object-cover object-top"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default BlindCardGame
