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
        className={`select-none rounded bg-polar-green-3 px-1 py-0.5 text-sm font-semibold dark:text-text-light ${
          className ?? ''
        }`}
      >
        ONGOING
      </div>
    )

  if (type === 'upcoming')
    return (
      <div
        className={`select-none rounded bg-primary-3 px-1 py-0.5 text-sm font-semibold dark:text-text-light ${
          className ?? ''
        }`}
      >
        UPCOMING
      </div>
    )

  if (type === 'finished')
    return (
      <div
        className={`select-none rounded bg-dust-red-4 px-1 py-0.5 text-sm font-semibold text-white ${
          className ?? ''
        }`}
      >
        FINISHED
      </div>
    )

  return (
    <div className={`select-none rounded px-1 py-0.5 text-sm font-semibold ${className ?? ''}`}>
      {title ?? 'Custom'}
    </div>
  )
}

export default Tag
