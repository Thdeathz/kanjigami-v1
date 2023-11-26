import classNames from 'classnames'
import React from 'react'

type PropsType = {
  type?: 'ongoing' | 'upcoming' | 'finished' | 'custom'
  title?: string
  className?: string
}

function getTagClassNames(type: string, className?: string) {
  return classNames(
    'select-none w-min whitespace-nowrap rounded px-2 py-[0.2rem] text-sm font-medium shadow-button',
    {
      'bg-green-light dark:bg-green-dark dark:text-white': type === 'ongoing',
      'bg-primary-light text-white': type === 'upcoming',
      'bg-red-light dark:bg-red-dark text-white': type === 'finished',
      'bg-clr-border-1-light dark:bg-clr-border-1-dark': type === 'custom'
    },
    className
  )
}

function Tag({ type = 'custom', title, className }: PropsType) {
  const tagClassName = getTagClassNames(type, className)
  let tagTitle = title ?? 'Custom'

  switch (type) {
    case 'ongoing':
      tagTitle = 'ONGOING'
      break
    case 'upcoming':
      tagTitle = 'UPCOMING'
      break
    case 'finished':
      tagTitle = 'FINISHED'
      break
    default:
      break
  }

  return <div className={tagClassName}>{tagTitle}</div>
}

export default Tag
