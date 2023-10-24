import React from 'react'
import { Divider, type DividerProps } from 'antd'

interface PropsType extends DividerProps {
  className?: string
}

const CustomDivider = ({ className, ...props }: PropsType) => {
  return (
    <Divider
      {...props}
      className={`rounded-full bg-text-light opacity-10 dark:bg-text-dark ${className}`}
    />
  )
}

export default CustomDivider
