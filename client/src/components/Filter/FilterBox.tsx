import React from 'react'

type PropsType = {
  children: React.ReactNode
}

const FilterBoxWrapper = ({ children }: PropsType) => {
  return (
    <div className="rounded-lg bg-gradient-to-tr from-card-light-start to-card-light-end p-2 shadow-hard-shadow dark:from-card-dark-start dark:to-card-dark-end">
      {children}
    </div>
  )
}

export default FilterBoxWrapper
