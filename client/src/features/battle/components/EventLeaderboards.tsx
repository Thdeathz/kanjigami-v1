import React from 'react'

import RankItem from './RankItem'
import Button from '~/components/Button'
import { useNavigate } from 'react-router-dom'

const EventLeaderboards = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-start justify-start gap-4">
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
    </div>
  )
}

export default EventLeaderboards
