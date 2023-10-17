import React, { MouseEventHandler, ReactNode } from 'react'

type PropsType = {
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const Button = ({ className, onClick, children }: PropsType) => {
  return (
    <button
      className={`h-10 rounded-full bg-button-light px-4 font-bold text-button-light-text shadow-button transition-all hover:translate-y-[-3px]  hover:bg-button-light-hover active:scale-90 dark:bg-button-dark dark:text-button-dark-text dark:hover:bg-button-dark-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
