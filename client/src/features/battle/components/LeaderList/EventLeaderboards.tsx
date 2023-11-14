import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import { gridList } from '~/config/variants'

import RankItem from './RankItem'

function EventLeaderboards() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="flex flex-col items-start justify-start gap-4"
      variants={gridList.container()}
      initial="hidden"
      animate="enter"
    >
      <>
        {Array.from(Array(11).keys()).map(each => {
          return <RankItem key={each} rank={each + 1} username="Kantan kanji" points={154532} battles={233} />
        })}
      </>

      <Button className="w-full font-semibold" onClick={() => navigate('/leaderboard')}>
        See top 100
      </Button>
    </motion.div>
  )
}

export default EventLeaderboards
