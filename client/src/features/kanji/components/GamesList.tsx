import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Panel from '~/components/Panel'

type GameItemPropsType = {
  name: string
}

const GameItem = ({ name }: GameItemPropsType) => {
  return (
    <div className="basis-1/4">
      <p className="mx-auto mb-4 w-min whitespace-nowrap rounded-md bg-gradient-to-tr from-filter-start-light to-filter-end-light p-1.5 font-medium uppercase dark:from-filter-start-dark dark:to-filter-end-dark">
        {name}
      </p>

      <div className="card-item cursor-pointer flex-col rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-glory-light hover:scale-105 hover:shadow-glory-hover dark:from-card-dark-start dark:to-card-dark-end dark:shadow-glory-dark">
        <div className="aspect-ratio w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/234.png?alt=media&token=4df8d4e0-c249-466c-9be9-b4db8be3806c"
            alt="round-game"
            className="max-w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center justify-between p-2">
          <div>
            <p className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark">
              Your hi-score
            </p>
            <p className="text-base font-medium">Not played</p>
          </div>

          <Button type="primary" className="flex-center aspect-square">
            <IconWrapper icon={<BsFillPlayFill />} className="text-2xl text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const GamesList = () => {
  return (
    <Panel className="mt-12">
      <div className="flex-center w-full gap-12">
        <GameItem name="MULTIPLE CHOOSE" />

        <GameItem name="PUNCH A HOLE" />

        <GameItem name="FLIP CARD" />

        <GameItem name="FLIP BLIND CARD" />
      </div>
    </Panel>
  )
}

export default GamesList
