import React from 'react'
import { BsStack } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import GameLayout from '~/components/Layouts/GameLayout'
import Loading from '~/components/Loading'

import { useGetStackDetailQuery } from '../kanji/store/kanjiService'

import BlindFlipCard from './BlindFlipCard'
import KanjiShooter from './KanjiShooter'
import MultipleChoice from './MultipleChoice'
import { useGetGameByIdQuery } from './store/gameService'

function Play() {
  const { stackId, gameId } = useParams()

  const { data: stack, isLoading: isGetStackData } = useGetStackDetailQuery(stackId as string)
  const { data: game, isLoading: isGetGameData } = useGetGameByIdQuery(gameId as string)

  if (isGetStackData || isGetGameData || !stack || !game || !stackId)
    return (
      <GameLayout>
        <Loading className="text-3xl" />
      </GameLayout>
    )

  return (
    <GameLayout
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
          label: <p>{game.name}</p>,
          to: `/play/${stack.id}/${game.id}`
        }
      ]}
    >
      {game.name === 'Blind Flip Card' && <BlindFlipCard game={game} stack={stack} />}

      {game.name === 'Kanji Shooter' && <KanjiShooter game={game} stack={stack} />}

      {game.name === 'Multiple Choice' && <MultipleChoice game={game} stack={stack} />}
    </GameLayout>
  )
}

export default Play
