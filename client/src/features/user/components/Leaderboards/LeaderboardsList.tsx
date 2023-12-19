import { motion } from 'framer-motion'
import React from 'react'

import Loading from '~/components/Loading'
import { gridList } from '~/config/variants'

import { useGetAllTimeLeaderboardsQuery } from '../../store/userService'

import LeaderboardItem from './LeaderboardItem'
import LeaderItem from './LeaderItem'

function LeaderboardsList() {
  const { data: leaderboards, isLoading } = useGetAllTimeLeaderboardsQuery({ page: 1, offset: 15 })

  if (isLoading || !leaderboards) return <Loading className="text-3xl" />

  return (
    <div className="mx-auto max-w-[45rem]">
      <div className="leader-top mb-6 flex items-end justify-end gap-1">
        <LeaderItem rank={2} topUser={leaderboards[1]} />

        <LeaderItem rank={1} topUser={leaderboards[0]} />

        <LeaderItem rank={3} topUser={leaderboards[2]} />
      </div>

      <motion.div
        className="flex flex-col items-center justify-start gap-4"
        variants={gridList.container(0.4)}
        initial="hidden"
        animate="enter"
      >
        {leaderboards.slice(3).map((leaderboard, index) => (
          <motion.div key={`leaderboards-${index}`} className="w-full" variants={gridList.item()}>
            <LeaderboardItem topUser={leaderboard} rank={index + 4} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default LeaderboardsList
