import React from 'react'
import { BsStack } from 'react-icons/bs'
import { GiCardExchange } from 'react-icons/gi'
import { useParams, useSearchParams } from 'react-router-dom'

import GameLayout from '~/components/Layouts/GameLayout'

import BlindCardGame from './components/BlindCardGame'
import GameLobby from './components/GameLobby'
import GameStatus from './components/GameStatus'

function FlipBlindCard() {
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
      {gameId ? (
        <>
          <GameStatus />

          <BlindCardGame />
        </>
      ) : (
        <GameLobby icon={<GiCardExchange />} title="Flip blind card" stackName="👪 家族" life={5} time="01:30" />
      )}
    </GameLayout>
  )
}

export default FlipBlindCard
