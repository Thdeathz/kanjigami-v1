import { Form } from 'antd'
import classNames from 'classnames'
import React, { InputHTMLAttributes, MouseEventHandler, ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons'

import IconWrapper from './IconWrapper'

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  withPrefix?: ReactNode
  lastIcon?: ReactElement<IconType>
  lastIconOnClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

function getInputClassName(withPrefix: boolean, status: string, className?: string) {
  return classNames(
    'grow border bg-input-light px-4 py-3 transition-colors focus:border-input-glory-light dark:bg-input-dark dark:focus:border-white',
    {
      'rounded-e-full': withPrefix,
      'rounded-full': !withPrefix,
      'border-red-light dark:border-red-dark': status === 'error',
      'border-green-light dark:border-green-dark': status === 'success',
      'border-input-border-light dark:border-input-border-dark': status === '' || status === undefined
    },
    className
  )
}

function Input({ id, withPrefix, lastIcon, lastIconOnClick, className, ...props }: PropsType) {
  const { status } = Form.Item.useStatus()
  const inputClassName = getInputClassName(!!withPrefix, status as string, className)

  return (
    <div className="flex-center relative w-full gap-[1px] text-base font-medium text-text-light dark:text-text-dark">
      {withPrefix && (
        <label
          htmlFor={id}
          className="cursor-pointer rounded-s-full border border-button-light bg-button-light px-4 py-3 font-semibold text-button-light-text shadow-button transition-all hover:translate-y-[-3px] hover:bg-button-light-hover active:scale-90 dark:border-button-dark dark:bg-button-dark dark:text-button-dark-text dark:hover:bg-button-dark-hover"
        >
          {withPrefix}
        </label>
      )}

      <input {...props} id={id} className={inputClassName} />

      {lastIcon && lastIconOnClick && (
        <button
          type="button"
          aria-label="input-toggle"
          className="absolute right-4 cursor-pointer"
          onClick={lastIconOnClick}
        >
          <IconWrapper icon={lastIcon} className="text-2xl text-text-secondary-light dark:text-text-secondary-dark" />
        </button>
      )}
    </div>
  )
}

export default Input
