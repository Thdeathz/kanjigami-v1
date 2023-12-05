import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import { gridList } from '~/config/variants'

import RankItem from './RankItem'

type PropsType = {
  leaderboards?: ITopUser[]
}

function EventLeaderboards({ leaderboards }: PropsType) {
  const navigate = useNavigate()

  return (
    <motion.div
      className="flex flex-col items-start justify-start gap-4"
      variants={gridList.container()}
      initial="hidden"
      animate="enter"
    >
      {leaderboards ? (
        <>
          {leaderboards.map((user, index) => (
            <RankItem
              key={`leader-${user.id}`}
              rank={index + 1}
              avatar={user.avatarUrl}
              username={user.username}
              points={user.totalPoints}
              battles={user.totalGames}
            />
          ))}
        </>
      ) : (
        <>
          {Array.from(Array(11).keys()).map(each => {
            return <RankItem key={each} rank={each + 1} username="Kantan kanji" points={154532} battles={233} />
          })}
        </>
      )}

      <motion.div className="w-full" variants={gridList.item()}>
        <Button className="w-full font-semibold" onClick={() => navigate('/leaderboard')}>
          See top 100
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default EventLeaderboards
