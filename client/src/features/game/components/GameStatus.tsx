import classNames from 'classnames'
import React from 'react'

import CountDown from '~/features/battle/components/CountDown'

type GameStatusWrapperPropsType = {
  position: string
  children: React.ReactNode
}

function getGmaeStatusWrapperClassName(position: string) {
  return classNames(
    'flex-center absolute right-0 z-[3] h-[3rem] cursor-pointer rounded-s-full bg-gradient-to-br from-side-bar-start from-0% to-side-bar-end to-85% px-4 text-clr-link-light shadow-button backdrop-blur-[5px] transition-transform duration-200 dark:from-rgb-gray-1 dark:to-rgb-gray-0.7 dark:text-clr-link-dark',
    position
  )
}

function GameStatusWrapper({ position, children }: GameStatusWrapperPropsType) {
  const gameStatusWrapperClassName = getGmaeStatusWrapperClassName(position)

  return (
    <button type="button" className={gameStatusWrapperClassName}>
      {children}
    </button>
  )
}

type PropsType = {
  time?: string
  score: number
  maxScore: number
  onTimeOut: () => void
}

function GameStatus({ score, maxScore, time, onTimeOut }: PropsType) {
  return (
    <>
      {time && (
        <GameStatusWrapper position="top-12">
          <CountDown endTime={time} onFinish={onTimeOut} />
        </GameStatusWrapper>
      )}

      <GameStatusWrapper position="top-28">
        <p className="select-none text-lg font-semibold">
          {score}/{maxScore}
        </p>
      </GameStatusWrapper>
    </>
  )
}

export default GameStatus
