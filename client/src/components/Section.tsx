import React, { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons'
import IconWrapper from './IconWrapper'

type PropsType = {
  title: string
  description: string
  icon?: ReactElement<IconType>
  viewButton?: ReactNode
  children: ReactNode
}

const Section = ({ title, description, icon, viewButton, children }: PropsType) => {
  return (
    <div className="mb-12 w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-full items-center justify-start gap-3">
          {icon && (
            <div className="aspect-square rounded-full bg-clr-border-1-light p-3 dark:bg-clr-border-1-dark">
              <IconWrapper icon={icon} className="text-3xl" />
            </div>
          )}

          <div className="flex w-full flex-col items-start justify-between">
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-base">{description}</p>
          </div>
        </div>

        {viewButton}
      </div>

      {children}
    </div>
  )
}

export default Section