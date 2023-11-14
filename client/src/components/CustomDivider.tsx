import { Divider, type DividerProps } from 'antd'
import React from 'react'

interface PropsType extends DividerProps {
  className?: string
}

function CustomDivider({ className, ...props }: PropsType) {
  return <Divider {...props} className={`rounded-full bg-text-light opacity-10 dark:bg-text-dark ${className}`} />
}

export default CustomDivider
