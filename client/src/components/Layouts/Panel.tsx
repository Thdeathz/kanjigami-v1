import React, { ReactNode } from 'react'

type PropsType = {
  children: ReactNode
}

const Panel = ({ children }: PropsType) => {
  return (
    <div className="rounded-lg bg-gradient-to-tr from-panel-light-start from-10% to-panel-light-end to-100% p-8 shadow-light-panel dark:from-rgb-gray-1-0.75 dark:to-rgb-gray-0-563 dark:shadow-dark-panel">
      {children}
    </div>
  )
}

export default Panel
