import React, { useState } from 'react'
import { BsStack } from 'react-icons/bs'
import { GiSelect } from 'react-icons/gi'
import { useParams, useSearchParams } from 'react-router-dom'

import GameLayout from '~/components/Layouts/GameLayout'
import Loading from '~/components/Loading'

import GameLobby from '../game/components/GameLobby'
import GameStatus from '../game/components/GameStatus'
import MultipleChoiceGame from '../game/MultipleChoiceGame'

import { useGetStackDetailQuery } from './store/kanjiService'

function MultipleChoice() {
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
      className="flex-col gap-8 py-8"
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
          label: <p>Multiple choice</p>,
          to: `/play/${stack.id}/multiple-choice`
        }
      ]}
    >
      {gameId ? (
        <>
          <GameStatus status={status} />

          <MultipleChoiceGame />
        </>
      ) : (
        <GameLobby icon={<GiSelect />} title="Multiple choice" stackName={stack.name} life={5} time="01:30" />
      )}
    </GameLayout>
  )
}

export default MultipleChoice
