import React, { MouseEventHandler } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import FlipBlindCardThumbnail from '~/assets/flip-blind-card-thumbnail.png'
import FlipCardThumbnail from '~/assets/flip-card-thumbnail.png'
import MultipleChoiceThumbnail from '~/assets/multiple-choice-thumbnail.png'
import PunchAHoleThumbnail from '~/assets/punch-a-hole-thumbnail.png'
import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import Panel from '~/components/Panel'

type GameItemPropsType = {
  name: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  thumbnail: string
}

function GameItem({ name, onClick, thumbnail }: GameItemPropsType) {
  return (
    <div className="basis-1/4">
      <p className="mx-auto mb-4 w-min whitespace-nowrap rounded-md bg-gradient-to-tr from-filter-start-light to-filter-end-light p-1.5 font-medium uppercase dark:from-filter-start-dark dark:to-filter-end-dark">
        {name}
      </p>

      <button
        type="button"
        className="card-item pointer-events-auto cursor-pointer flex-col rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-glory-light hover:scale-105 hover:opacity-100 hover:shadow-glory-hover dark:from-card-dark-start dark:to-card-dark-end dark:shadow-glory-dark"
        onClick={onClick}
      >
        <div className="aspect-ratio w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
          <Image src={thumbnail} alt="round-game" className="h-full w-full rounded-lg object-cover object-top" />
        </div>

        <div className="flex items-center justify-between p-2">
          <div>
            <p className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark">Your hi-score</p>
            <p className="text-base font-medium">Not played</p>
          </div>

          <Button type="primary" className="flex-center aspect-square">
            <IconWrapper icon={<BsFillPlayFill />} className="text-2xl text-white" />
          </Button>
        </div>
      </button>
    </div>
  )
}

function GamesList() {
  const navigate = useNavigate()

  return (
    <Panel className="mt-12">
      <div className="card-list pointer-events-none grid w-full grid-cols-4 gap-12 transition-opacity">
        <GameItem name="MULTIPLE CHOOSE" thumbnail={MultipleChoiceThumbnail} />

        <GameItem name="PUNCH A HOLE" thumbnail={PunchAHoleThumbnail} />

        <GameItem name="FLIP CARD" thumbnail={FlipCardThumbnail} />

        <GameItem
          name="FLIP BLIND CARD"
          thumbnail={FlipBlindCardThumbnail}
          onClick={() => navigate('/play/1/blind-card')}
        />
      </div>
    </Panel>
  )
}

export default GamesList
