import React, { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'

import IconWrapper from './IconWrapper'

type PropsType = {
  icon?: ReactElement<IconType>
  title: string
  subtitle?: string
  className?: string
  children?: ReactNode
}

const PageHeader = ({ icon, title, subtitle, className, children }: PropsType) => {
  return (
    <div
      className={`flex-center mx-auto max-w-[25rem] flex-col gap-4 text-center ${className ?? ''}`}
    >
      {icon && <IconWrapper icon={icon} className="text-4xl" />}

      <p className="text-2xl font-semibold text-text-heading-light dark:text-text-heading-dark">
        {title}
      </p>

      {subtitle && (
        <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  )
}

export default PageHeader
