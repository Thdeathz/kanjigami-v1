import classNames from 'classnames'
import React from 'react'

import { onlineBattleStatus } from '~/config/status'

type PropsType = {
  type?: OnlineBattleStatus | 'custom'
  title?: string
  className?: string
}

function getTagTitle(type: OnlineBattleStatus | 'custom', title?: string) {
  switch (type) {
    case onlineBattleStatus.ONGOING:
      return onlineBattleStatus.ONGOING
    case onlineBattleStatus.UPCOMING:
      return onlineBattleStatus.UPCOMING
    case onlineBattleStatus.FINISHED:
      return onlineBattleStatus.FINISHED
    default:
      return title
  }
}

function getTagClassNames(type: string, className?: string) {
  return classNames(
    'select-none w-min whitespace-nowrap rounded px-2 py-[0.2rem] text-sm font-medium shadow-button',
    {
      'bg-green-light dark:bg-green-dark dark:text-white': type === onlineBattleStatus.ONGOING,
      'bg-primary-light text-white': type === onlineBattleStatus.UPCOMING,
      'bg-red-light dark:bg-red-dark text-white': type === onlineBattleStatus.FINISHED,
      'bg-clr-border-1-light dark:bg-clr-border-1-dark': type === 'custom'
    },
    className
  )
}

function Tag({ type = 'custom', title, className }: PropsType) {
  const tagClassName = getTagClassNames(type, className)
  const tagTitle = getTagTitle(type, title)

  return <div className={tagClassName}>{tagTitle}</div>
}

export default Tag
