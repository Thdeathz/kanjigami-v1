import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { motion } from 'framer-motion'

import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import { gridList } from '~/config/variants'

type PropsType = {
  rank: number
  username: string
  points: number
  battles: number
}

const RankItem = ({ rank, username, points, battles }: PropsType) => {
  let gradientEndColor = ''
  let crownColor = ''

  if (rank === 1) {
    gradientEndColor = 'to-ranking-1-end-light dark:to-ranking-1-end-dark'
    crownColor = 'text-ranking-1-crown'
  }

  if (rank === 2) {
    gradientEndColor = 'to-ranking-2-end-light dark:to-ranking-2-end-dark'
    crownColor = 'text-ranking-2-crown'
  }

  if (rank === 3) {
    gradientEndColor = 'to-ranking-3-end-light dark:to-ranking-3-end-dark'
    crownColor = 'text-ranking-3-crown'
  }

  if (rank > 3) gradientEndColor = 'to-ranking-4-10-end-light dark:to-ranking-4-10-end-dark'

  return (
    <motion.div
      className={`flex w-full items-center justify-start gap-2 rounded-full bg-gradient-to-r from-ranking-start-light p-2 shadow-hard-shadow dark:from-ranking-start-dark ${gradientEndColor}`}
      variants={gridList.item()}
    >
      <Avatar />

      <div className="flex flex-col items-start justify-start gap-1">
        <div className="flex-center gap-1 text-base font-semibold leading-3">
          {rank <= 3 && <IconWrapper icon={<FaCrown />} className={crownColor} />} {username}
        </div>
        <p className="text-sm font-medium leading-3">
          {points} ({battles} Battles)
        </p>
      </div>
    </motion.div>
  )
}

export default RankItem
