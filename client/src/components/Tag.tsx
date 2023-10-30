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
        className={`select-none rounded bg-green-light px-2 py-[0.2rem] text-sm font-medium shadow-button dark:bg-green-dark dark:text-white ${
          className ?? ''
        }`}
      >
        ONGOING
      </div>
    )

  if (type === 'upcoming')
    return (
      <div
        className={`select-none rounded bg-primary-light px-2 py-[0.2rem] text-sm font-medium text-white  shadow-button ${
          className ?? ''
        }`}
      >
        UPCOMING
      </div>
    )

  if (type === 'finished')
    return (
      <div
        className={`select-none rounded bg-red-light px-2 py-[0.2rem] text-sm font-medium text-white shadow-button dark:bg-red-dark ${
          className ?? ''
        }`}
      >
        FINISHED
      </div>
    )

  return (
    <div
      className={`select-none rounded bg-clr-border-1-light px-2 py-[0.2rem] text-sm font-medium shadow-button dark:bg-clr-border-1-dark ${
        className ?? ''
      }`}
    >
      {title ?? 'Custom'}
    </div>
  )
}

export default Tag
