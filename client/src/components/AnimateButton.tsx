import classNames from 'classnames'
import React, { CSSProperties, ReactNode } from 'react'

import Button, { ButtonPropsType } from './Button'

interface PropsType extends ButtonPropsType {
  children: string | ReactNode
  className?: string
  animate?: 'jumping' | 'smoke' | 'drive'
}

function getAnimateButtonClassNames(animate: string, className?: string) {
  return classNames(
    'flex-center animate-button',
    {
      button__jumping: animate === 'jumping',
      button__smoke: animate === 'smoke',
      button__drive: animate === 'drive'
    },
    className
  )
}

function AnimateButton({ className, disabled, animate = 'jumping', children, ...props }: PropsType) {
  const animateButtonClassName = getAnimateButtonClassNames(animate, className)

  return (
    <Button className={animateButtonClassName} {...props}>
      {typeof children === 'string' && !disabled
        ? children
            .trim()
            .split('')
            .map((each, index) => (
              <span
                key={`animate-btn-${index}`}
                className="block"
                style={{ '--d': `${(index + 1) / 20}s` } as CSSProperties}
              >
                {each}
              </span>
            ))
        : children}
    </Button>
  )
}

export default AnimateButton
