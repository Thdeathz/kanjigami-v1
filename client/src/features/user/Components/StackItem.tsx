import React from 'react'
import { BsBookFill } from 'react-icons/bs'

import IconWrapper from '~/components/IconWrapper'

type PropsType = {
  imageSrc: string
  stack: string
  hightScore?: number
  className?: string
}

const StackItem = ({ imageSrc, stack, hightScore, className }: PropsType) => {
  return (
    <div
      className={`card-item pointer-events-auto z-10 cursor-pointer rounded-lg bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-3 shadow-card hover:scale-105 hover:opacity-100 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel ${className}`}
    >
      <div className="w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
        <img
          src={imageSrc}
          alt="stack-thumbnail"
          className="aspect-ratio w-full rounded-lg object-cover"
        />
      </div>

      <p className="my-2 text-lg font-semibold">{stack}</p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">Your hi-score</p>
          <p className="text-base font-medium">{hightScore ?? 'Not played'}</p>
        </div>

        <div className="aspect-square rounded-full bg-clr-border-1-light p-3 dark:bg-clr-border-1-dark">
          <IconWrapper icon={<BsBookFill />} />
        </div>
      </div>
    </div>
  )
}

export default StackItem
