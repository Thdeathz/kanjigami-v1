import { message } from 'antd'
import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'

import NewRoundItem from './NewRoundItem'

type PropsType = {
  rounds: NewRound[]
  setRounds: React.Dispatch<React.SetStateAction<NewRound[]>>
}

function FormBattleRound({ rounds, setRounds }: PropsType) {
  const handleAddNewRound = () => {
    if (rounds.length >= 12) {
      message.warning('You can only add up to 12 rounds')
      return
    }

    setRounds(prev => [
      ...prev,
      {
        game: {},
        stack: {}
      }
    ])
  }

  return (
    <div className="grid grid-cols-5 gap-12 pr-12">
      <div
        className="flex-center mb-[5px] aspect-ratio w-full cursor-pointer gap-2 rounded-md border-2 border-dashed border-input-border-light text-text-light transition-colors duration-200 hover:border-input-glory-light dark:border-input-border-dark dark:text-text-dark dark:hover:border-white"
        onClick={handleAddNewRound}
      >
        <AiFillPlusCircle className="text-3xl" />

        <span className="select-none text-lg font-medium">Add Round</span>
      </div>

      {rounds.map((round, index) => (
        <NewRoundItem key={`new-round-${index}`} index={index} round={round} setRounds={setRounds} />
      ))}
    </div>
  )
}

export default FormBattleRound
