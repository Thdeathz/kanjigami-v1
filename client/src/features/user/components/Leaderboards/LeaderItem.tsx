import { motion } from 'framer-motion'
import React from 'react'
import { FaCrown } from 'react-icons/fa'

import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import { topLeader } from '~/config/variants'

type PropsType = {
  rank: number
  topUser: ITopUser
}

function LeaderItem({ rank, topUser }: PropsType) {
  let height = ''
  let crownColor = ''

  if (rank === 1) {
    // height = 'h-44'
    height = '11rem'
    crownColor = 'text-ranking-1-crown'
  }

  if (rank === 2) {
    height = '8rem'
    crownColor = 'text-ranking-2-crown'
  }

  if (rank === 3) {
    height = '5rem'
    crownColor = 'text-ranking-3-crown'
  }

  return (
    <motion.div className="relative basis-1/3" variants={topLeader.container} initial="hidden" animate="enter">
      <motion.div className="flex-center flex-col gap-4" variants={topLeader.userInfo}>
        <IconWrapper icon={<FaCrown />} className={`text-2xl ${crownColor}`} />

        <Avatar src={topUser.avatarUrl} size="large" />

        <div className="text-center">
          <p className="mb-1 text-xl font-semibold">{topUser.username}</p>

          <p>{topUser.totalPoints}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex-center front bg-gradient-to-tr from-ranking-background-start-light to-ranking-background-end text-6xl font-bold text-ranking-number dark:from-ranking-background-start-dark"
        variants={topLeader.topBar(height)}
      >
        {rank}
      </motion.div>
    </motion.div>
  )
}

export default LeaderItem
