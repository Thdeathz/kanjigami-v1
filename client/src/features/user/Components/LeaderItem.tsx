import React from 'react'
import { FaCrown } from 'react-icons/fa'
import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'

type PropsType = {
  rank: number
}

const LeaderItem = ({ rank }: PropsType) => {
  let height = ''
  let crownColor = ''

  if (rank === 1) {
    height = 'h-44'
    crownColor = 'text-ranking-1-crown'
  }

  if (rank === 2) {
    height = 'h-32'
    crownColor = 'text-ranking-2-crown'
  }

  if (rank === 3) {
    height = 'h-24'
    crownColor = 'text-ranking-3-crown'
  }

  return (
    <div className="relative basis-1/3">
      <div className="flex-center flex-col gap-4">
        <IconWrapper icon={<FaCrown />} className={`text-2xl ${crownColor}`} />

        <Avatar size="large" />

        <div className="text-center">
          <p className="mb-1 text-xl font-semibold">Kantan kanji</p>

          <p>234534</p>
        </div>
      </div>

      <div
        className={`flex-center front bg-gradient-to-tr from-ranking-background-start-light to-ranking-background-end text-6xl font-bold text-ranking-number dark:from-ranking-background-start-dark ${height}`}
      >
        {rank}
      </div>
    </div>
  )
}

export default LeaderItem