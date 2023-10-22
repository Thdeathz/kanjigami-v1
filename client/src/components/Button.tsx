import React, { MouseEventHandler, ReactNode } from 'react'

type PropsType = {
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  type?: 'primary' | 'default' | 'disabled'
}

const Button = ({ className, onClick, type = 'default', children }: PropsType) => {
  return (
    <button
      className={`h-10 whitespace-nowrap rounded-full px-4 font-bold shadow-button transition-all hover:translate-y-[-3px] active:scale-90 dark:bg-button-dark  
      ${
        type === 'default'
          ? 'bg-button-light text-button-light-text hover:bg-button-light-hover dark:text-button-dark-text dark:hover:bg-button-dark-hover'
          : ''
      }
      ${
        type === 'primary'
          ? 'bg-primary-6 text-white hover:bg-primary-5 dark:bg-primary-6 dark:text-white dark:hover:bg-primary-5'
          : ''
      }
      ${
        type === 'disabled'
          ? 'cursor-not-allowed bg-neutral-8 text-white dark:bg-neutral-8 dark:text-white'
          : ''
      }
      ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
