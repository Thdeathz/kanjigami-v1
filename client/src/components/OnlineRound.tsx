import React from 'react'

import LockedIcon from '~/assets/lock-icon.svg'
import Image from './Image'

type PropsType = {
  imageSrc?: string
  stack?: string
}

const OnlineRound = ({ imageSrc, stack }: PropsType) => {
  return (
    <div
      className={`relative aspect-ratio rounded-lg shadow-md transition-transform ${
        stack ? 'cursor-pointer hover:scale-105' : 'flex-center bg-game-locked'
      }`}
    >
      {stack && (
        <>
          <Image
            src={imageSrc}
            alt="round-game"
            className="h-full w-full rounded-lg object-cover"
          />

          <p className="absolute right-2 top-2 z-10 rounded bg-neutral-13 px-1.5 py-0.5 text-sm text-white">
            {stack}
          </p>
        </>
      )}

      {!stack && <Image src={LockedIcon} alt="locked-icon" className="w-[2.5rem]" />}
    </div>
  )
}

export default OnlineRound
