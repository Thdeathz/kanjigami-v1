import React from 'react'
import { BsStack } from 'react-icons/bs'
import { GiBulletBill } from 'react-icons/gi'
import { useParams, useSearchParams } from 'react-router-dom'

import GameLayout from '~/components/Layouts/GameLayout'

import GameLobby from '../game/components/GameLobby'
import KanjiShooterGame from '../game/KanjiShooter'

function KanjiShooter() {
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
          label: <p>Kanji shooter</p>,
          to: `/play/${stackId}/kanji-shooter`
        }
      ]}
    >
      <>
        {gameId ? (
          <KanjiShooterGame />
        ) : (
          <GameLobby icon={<GiBulletBill />} title="Kanji shooter" stackName="👪 家族" life={5} time="&infin;" />
        )}
      </>
    </GameLayout>
  )
}

export default KanjiShooter
