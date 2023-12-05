import React from 'react'

import LockedIcon from '~/assets/lock-icon.svg'
import { onlineBattleStatus } from '~/config/status'

import Image from './Image'

type PropsType = {
  status: OnlineBattleStatus
  imageSrc?: string
  stack?: string
}

function OnlineRound({ status, imageSrc, stack }: PropsType) {
  const isLocked = status === onlineBattleStatus.UPCOMING

  return (
    <div
      className={`relative aspect-ratio rounded-lg shadow-md transition-transform ${
        !isLocked ? 'cursor-pointer hover:scale-105' : 'flex-center bg-game-locked'
      }`}
    >
      {isLocked ? (
        <Image src={LockedIcon} alt="locked-icon" className="w-[2.5rem]" />
      ) : (
        <>
          <Image src={imageSrc} alt="round-game" className="h-full w-full rounded-lg object-cover" />

          <p className="absolute right-2 top-2 z-10 rounded bg-neutral-13 px-1.5 py-0.5 text-sm font-medium text-white">
            {stack}
          </p>
        </>
      )}
    </div>
  )
}

export default OnlineRound
