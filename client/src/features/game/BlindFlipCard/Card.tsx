import { motion } from 'framer-motion'
import React from 'react'

import CardBackground from '~/assets/card-background.gif'
import Image from '~/components/Image'
import { cardList } from '~/config/variants'

type PropsType = {
  kanji: ImageContent | KanjiContent
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Card({ kanji, onClick }: PropsType) {
  return (
    <motion.div
      className={`card relative cursor-pointer active:scale-95 ${kanji.isVisible ? '' : 'invisible'}`}
      onClick={onClick}
      variants={cardList.item}
    >
      <div className="card-back absolute aspect-ratio h-full w-full rounded-lg bg-white">
        {kanji.type === 'image' && (
          <div className="relative h-full w-full">
            <Image src={kanji.image} className="h-full w-full rounded-lg object-cover object-center" />

            <p className="absolute left-10 top-10 z-10 bg-white text-2xl text-text-light opacity-50">{kanji.kunyomi}</p>
          </div>
        )}

        {kanji.type === 'kanji' && (
          <div className="flex-center h-full text-2xl text-text-heading-light">
            <p>{kanji.kanji}</p>
          </div>
        )}
      </div>

      <div className="card-front absolute aspect-ratio h-full w-full">
        <Image src={CardBackground} className="h-full w-full rounded-lg object-cover object-top" />
      </div>
    </motion.div>
  )
}

export default Card
