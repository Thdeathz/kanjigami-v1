/* eslint-disable react/button-has-type */
import classNames from 'classnames'
import React, { MouseEventHandler, ReactNode } from 'react'

type PropsType = {
  className?: string
  htmlType?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled?: boolean
  type?: 'primary' | 'default' | 'disabled' | 'danger'
}

function getButtonClassNames(type: string, disabled: boolean, className?: string) {
  return classNames(
    'h-10 whitespace-nowrap rounded-full px-4 font-bold shadow-button transition-all duration-200',
    {
      'hover:translate-y-[-3px] active:scale-90 dark:bg-button-dark': !disabled && type !== 'disabled',
      'bg-button-light text-button-light-text hover:bg-button-light-hover dark:text-button-dark-text dark:hover:bg-button-dark-hover':
        type === 'default',
      'bg-primary-light text-white hover:bg-primary-hover dark:bg-primary-light dark:hover:bg-primary-hover':
        type === 'primary',
      'bg-red-light text-white hover:bg-red-hover dark:bg-red-dark dark:hover:bg-red-hover': type === 'danger',
      'cursor-not-allowed bg-neutral-8 text-white dark:bg-neutral-8 dark:text-white': type === 'disabled'
    },
    className
  )
}

function Button({ className, onClick, htmlType, type = 'default', disabled = false, children }: PropsType) {
  const buttonClassName = getButtonClassNames(type, disabled, className)

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled} type={htmlType || 'button'}>
      {children}
    </button>
  )
}

export default Button

export type { PropsType as ButtonPropsType }
