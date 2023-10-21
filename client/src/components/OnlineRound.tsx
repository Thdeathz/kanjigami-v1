import React from 'react'

import LockedIcon from '~/assets/lock-icon.svg'

type PropsType = {
  imageSrc?: string
  stack?: string
}

const OnlineRound = ({ imageSrc, stack }: PropsType) => {
  return (
    <div
      className={`relative h-full w-full rounded-lg shadow-md transition-transform ${
        stack ? 'cursor-pointer hover:scale-105' : 'flex-center bg-game-locked'
      }`}
    >
      {stack && (
        <>
          <img src={imageSrc} alt="round-game" className="rounded-lg object-cover" />

          <p className="absolute right-2 top-2 rounded bg-neutral-13 px-1.5 py-0.5 text-sm text-white">
            {stack}
          </p>
        </>
      )}

      {!stack && <img src={LockedIcon} alt="locked-icon" className="w-[3rem]" />}
    </div>
  )
}

export default OnlineRound
