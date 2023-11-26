import { Divider } from 'antd'
import React from 'react'

type PropsType = {
  title: string
  className?: string
}

function SectionDivider({ title, className }: PropsType) {
  return (
    <div className={`flex w-full items-center justify-start overflow-hidden ${className ?? ''}`}>
      <div className="whitespace-nowrap bg-[#ebeff3] py-0.5 pr-6 font-semibold text-text-light dark:bg-[#121518] dark:text-text-dark">
        {title}
      </div>
      <Divider className="grow basis-0 bg-divider-light dark:bg-divider-dark" />
    </div>
  )
}

export default SectionDivider
