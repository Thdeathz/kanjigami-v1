import React from 'react'
import { BsBookFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import IconWrapper from '~/components/IconWrapper'

type PropsType = {
  stackId: number
  imageSrc: string
  stack: string
  hightScore?: number
  className?: string
}

const StackItem = ({ stackId, imageSrc, stack, hightScore, className }: PropsType) => {
  const navigate = useNavigate()

  return (
    <div
      className={`card-item pointer-events-auto z-10 cursor-pointer rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-card hover:translate-y-[-10px] hover:scale-105 hover:opacity-100 active:translate-y-0 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel ${
        className ?? ''
      }`}
      onClick={() => navigate(`/kanji/${stackId}`)}
    >
      <div className="w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
        <img
          src={imageSrc}
          alt="stack-thumbnail"
          className="aspect-ratio w-full rounded-lg object-cover"
        />
      </div>

      <p className="mt-2 px-2 text-lg font-semibold">{stack}</p>

      <div className="flex items-center justify-between p-2">
        <div>
          <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            Your hi-score
          </p>
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
