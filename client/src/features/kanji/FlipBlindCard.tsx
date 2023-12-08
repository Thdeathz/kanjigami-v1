import React, { useState } from 'react'
import { BsStack } from 'react-icons/bs'
import { GiCardExchange } from 'react-icons/gi'
import { useParams, useSearchParams } from 'react-router-dom'

import GameLayout from '~/components/Layouts/GameLayout'
import Loading from '~/components/Loading'

import BlindCardGame from '../game/BlindCard'
import GameLobby from '../game/components/GameLobby'
import GameStatus from '../game/components/GameStatus'

import { useGetStackDetailQuery } from './store/kanjiService'
import GameEnd from '../game/components/GameEnd'

function FlipBlindCard() {
  const { stackId } = useParams()
  const [searchParams] = useSearchParams()
  const gameId = searchParams.get('gameId')

  const { data: stack, isLoading } = useGetStackDetailQuery(stackId as string)

  const [status, setStatus] = useState<GameStatusType>({
    life: 5,
    time: new Date(new Date().getTime() + 5 * 60000 + 1000),
    score: 0
  })

  if (isLoading || !stack)
    return (
      <GameLayout game="blind-card">
        <Loading className="text-3xl" />
      </GameLayout>
    )

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
          label: <p>{stack.name}</p>,
          to: `/kanji/${stack.id}`
        },
        {
          label: <p>Blind Flip Card</p>,
          to: `/play/${stack.id}/blind-flip-card`
        }
      ]}
    >
      {gameId ? (
        status.life > 0 && status.score < 12 ? (
          <>
            <GameStatus status={status} />

            <BlindCardGame setStatus={setStatus} />
          </>
        ) : (
          <GameEnd icon={<GiCardExchange />} title="Flip blind card" />
        )
      ) : (
        <GameLobby icon={<GiCardExchange />} title="Flip blind card" stackName={stack.name} life={5} time="05:00" />
      )}
    </GameLayout>
  )
}

export default FlipBlindCard
