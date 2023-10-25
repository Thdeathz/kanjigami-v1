import React from 'react'
import { motion } from 'framer-motion'

import RankItem from './RankItem'
import Button from '~/components/Button'
import { useNavigate } from 'react-router-dom'
import { gridList } from '~/config/variants'

const EventLeaderboards = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      className="flex flex-col items-start justify-start gap-4"
      variants={gridList.container()}
      initial="hidden"
      animate="enter"
    >
      <>
        {Array.from(Array(11).keys()).map(index => {
          if (index != 0)
            return (
              <RankItem
                key={index}
                rank={index}
                username="Kantan kanji"
                points={154532}
                battles={233}
              />
            )
        })}
      </>

      <Button className="w-full font-semibold" onClick={() => navigate('/leaderboard')}>
        See top 100
      </Button>
    </motion.div>
  )
}

export default EventLeaderboards
