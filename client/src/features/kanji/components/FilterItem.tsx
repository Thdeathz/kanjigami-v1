import React, { ReactNode } from 'react'

type PropsType = {
  actived?: boolean
  children: ReactNode
}

const FilterItem = ({ actived = false, children }: PropsType) => {
  return (
    <button
      className={`rounded px-4 py-2 font-medium text-clr-link-light dark:text-clr-link-dark ${
        actived &&
        'bg-gradient-to-tr from-filter-start-light to-filter-end-light dark:from-filter-start-dark dark:to-filter-end-dark'
      }`}
    >
      {children}
    </button>
  )
}

export default FilterItem
