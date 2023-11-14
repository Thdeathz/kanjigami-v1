import React, { ReactNode } from 'react'

type PropsType = {
  heading: string
  children: ReactNode
}

function SideSection({ heading, children }: PropsType) {
  return (
    <div className="w-full pb-4">
      <div className="mb-2 w-full bg-side-item-light-heading py-1 pl-10 text-base font-bold uppercase text-side-item-light-link opacity-50 dark:bg-side-item-dark-heading dark:text-side-item-dark-link">
        {heading}
      </div>

      <div className="flex w-full flex-col items-start justify-start gap-2 pl-6">{children}</div>
    </div>
  )
}

export default SideSection
