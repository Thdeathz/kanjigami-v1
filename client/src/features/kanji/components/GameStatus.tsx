import React, { useState } from 'react'
import { GiHearts } from 'react-icons/gi'

import IconWrapper from '~/components/IconWrapper'

type GameStatusWrapperPropsType = {
  position: string
  isShowFull: boolean
  setIsShowFull: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const GameStatusWrapper = ({
  position,
  isShowFull,
  setIsShowFull,
  children
}: GameStatusWrapperPropsType) => {
  return (
    <div
      className={`flex-center absolute right-0 z-[3] h-[3rem] cursor-pointer rounded-s-full bg-gradient-to-br from-side-bar-start from-0% to-side-bar-end to-85% px-4 text-clr-link-light shadow-button backdrop-blur-[5px] transition-transform duration-200 dark:from-rgb-gray-1 dark:to-rgb-gray-0.7 dark:text-clr-link-dark
        ${position}
        ${isShowFull ? '' : 'translate-x-[75%]'}
      `}
      onClick={() => setIsShowFull(prev => !prev)}
    >
      {children}
    </div>
  )
}

const GameStatus = () => {
  const [isShowFullLeftLive, setIsShowFullLeftLive] = useState<boolean>(false)
  const [isShowFullPoint, setIsShowFullPoint] = useState<boolean>(false)
  const [isShowFullTime, setIsShowFullTime] = useState<boolean>(false)

  return (
    <>
      <GameStatusWrapper position="top-12" isShowFull={true} setIsShowFull={setIsShowFullPoint}>
        <p className="select-none text-lg font-semibold ">00:01</p>
      </GameStatusWrapper>

      <GameStatusWrapper
        position="top-28"
        isShowFull={isShowFullLeftLive}
        setIsShowFull={setIsShowFullLeftLive}
      >
        <div className="flex-center gap-2">
          <div className="relative">
            <IconWrapper icon={<GiHearts />} className="text-3xl text-red-light" />
            {!isShowFullLeftLive && (
              <p className="absolute left-1.5 top-1 select-none text-sm font-semibold text-white">
                x5
              </p>
            )}
          </div>

          {Array.from(Array(4).keys()).map((_, index) => (
            <IconWrapper
              key={`left-live-${index}`}
              icon={<GiHearts />}
              className="text-3xl text-red-light"
            />
          ))}
        </div>
      </GameStatusWrapper>

      <GameStatusWrapper position="top-44" isShowFull={true} setIsShowFull={setIsShowFullPoint}>
        <p className="select-none text-lg font-semibold">0/12</p>
      </GameStatusWrapper>
    </>
  )
}

export default GameStatus