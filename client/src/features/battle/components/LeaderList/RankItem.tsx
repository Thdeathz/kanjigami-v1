import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'
import { FaCrown } from 'react-icons/fa'

import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import { gridList } from '~/config/variants'

type PropsType = {
  rank: number
  username: string
  points: number
  battles: number
}

function getRankItemClassName(rank: number) {
  return classNames(
    'flex w-full items-center justify-start gap-2 rounded-full bg-gradient-to-r from-ranking-start-light p-2 shadow-hard-shadow dark:from-ranking-start-dark',
    {
      'to-ranking-1-end-light dark:to-ranking-1-end-dark': rank === 1,
      'to-ranking-2-end-light dark:to-ranking-2-end-dark': rank === 2,
      'to-ranking-3-end-light dark:to-ranking-3-end-dark': rank === 3,
      'to-ranking-4-10-end-light dark:to-ranking-4-10-end-dark': rank > 3
    }
  )
}

function getCrownColor(rank: number) {
  switch (rank) {
    case 1:
      return 'text-ranking-1-crown'
    case 2:
      return 'text-ranking-2-crown'
    case 3:
      return 'text-ranking-3-crown'
    default:
      return ''
  }
}

function RankItem({ rank, username, points, battles }: PropsType) {
  const rankItemClassName = getRankItemClassName(rank)
  const crownColor = getCrownColor(rank)

  return (
    <motion.div className={rankItemClassName} variants={gridList.item()}>
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
