import classNames from 'classnames'
import React, { ReactNode } from 'react'

type PropsType = {
  className?: string
  children: ReactNode
}

function getPanelClassName(className?: string) {
  return classNames(
    'h-auto w-full rounded-lg bg-gradient-to-tr from-panel-light-start from-10% to-panel-light-end to-100% p-8 shadow-light-panel dark:from-rgb-gray-1-0.75 dark:to-rgb-gray-0-0.563 dark:shadow-dark-panel',
    className
  )
}

function Panel({ className, children }: PropsType) {
  const panelClassName = getPanelClassName(className)

  return <div className={panelClassName}>{children}</div>
}

export default Panel
