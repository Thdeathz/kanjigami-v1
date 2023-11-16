import React from 'react'

import Button, { ButtonPropsType } from './Button'

interface PropsType extends ButtonPropsType {
  children: string
}

function AnimateButton({ children, ...props }: PropsType) {
  return (
    <Button {...props}>
      {children
        .trim()
        .split(' ')
        .map(each => (
          <span key={`animate-btn-${each}`}>{each}</span>
        ))}
    </Button>
  )
}

export default AnimateButton
