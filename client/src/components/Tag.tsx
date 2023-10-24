import React from 'react'

type PropsType = {
  type?: 'ongoing' | 'upcoming' | 'finished' | 'custom'
  title?: string
  className?: string
}

const Tag = ({ type = 'custom', title, className }: PropsType) => {
  if (type === 'ongoing')
    return (
      <div
        className={`select-none rounded bg-polar-green-3 px-2 py-1 text-sm font-medium shadow-button dark:text-text-light ${
          className ?? ''
        }`}
      >
        ONGOING
      </div>
    )

  if (type === 'upcoming')
    return (
      <div
        className={`select-none rounded bg-primary-3 px-2 py-1 text-sm font-medium shadow-button dark:text-text-light ${
          className ?? ''
        }`}
      >
        UPCOMING
      </div>
    )

  if (type === 'finished')
    return (
      <div
        className={`select-none rounded bg-dust-red-4 px-2 py-1 text-sm font-medium text-white shadow-button ${
          className ?? ''
        }`}
      >
        FINISHED
      </div>
    )

  return (
    <div
      className={`select-none rounded bg-clr-border-1-light px-2 py-1 text-sm font-medium shadow-button dark:bg-clr-border-1-dark ${
        className ?? ''
      }`}
    >
      {title ?? 'Custom'}
    </div>
  )
}

export default Tag
