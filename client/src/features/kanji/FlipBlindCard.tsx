import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { BsStack } from 'react-icons/bs'

import GameLayout from '~/components/Layouts/GameLayout'
import GameLobby from './components/GameLobby'
import { GiCardExchange } from 'react-icons/gi'
import GameStatus from './components/GameStatus'
import BlindCardGame from './components/BlindCardGame'

const FlipBlindCard = () => {
  const { stackId } = useParams()
  const [searchParams] = useSearchParams()
  const gameId = searchParams.get('gameId')

  return (
    <GameLayout
      game="blind-card"
      breadcrumbs={[
        {
          label: (
            <div className="flex-center gap-2">
              <BsStack /> Kanji stack
            </div>
          ),
          to: '/kanji'
        },
        {
          label: <p>👪 家族</p>,
          to: `/kanji/${stackId}`
        },
        {
          label: <p>Flip Blind Card</p>,
          to: `/kanji/${stackId}/blind-card`
        }
      ]}
      className={gameId ? '' : 'flex-center'}
    >
      <>
        {gameId ? (
          <>
            <GameStatus />

            <BlindCardGame />
          </>
        ) : (
          <GameLobby
            icon={<GiCardExchange />}
            title="Flip blind card"
            stackName="👪 家族"
            life={5}
            time="01:30"
          />
        )}
      </>
    </GameLayout>
  )
}

export default FlipBlindCard
