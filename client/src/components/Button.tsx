import React, { MouseEventHandler, ReactNode } from 'react'

type PropsType = {
  className?: string
  htmlType?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled?: boolean
  type?: 'primary' | 'default' | 'disabled'
}

const Button = ({
  className,
  onClick,
  htmlType,
  type = 'default',
  disabled = false,
  children
}: PropsType) => {
  return (
    <button
      className={`h-10 whitespace-nowrap rounded-full px-4 font-bold shadow-button transition-all duration-200 
      ${
        !disabled &&
        type !== 'disabled' &&
        'hover:translate-y-[-3px] active:scale-90 dark:bg-button-dark'
      }
      ${
        type === 'default' &&
        'bg-button-light text-button-light-text hover:bg-button-light-hover dark:text-button-dark-text dark:hover:bg-button-dark-hover'
      }
      ${
        type === 'primary' &&
        'bg-primary-light text-white hover:bg-primary-hover dark:bg-primary-light dark:text-white dark:hover:bg-primary-hover'
      }
      ${
        type === 'disabled' &&
        'cursor-not-allowed bg-neutral-8 text-white dark:bg-neutral-8 dark:text-white'
      }
      ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      {children}
    </button>
  )
}

export default Button
