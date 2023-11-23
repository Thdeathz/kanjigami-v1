import { Divider } from 'antd'
import React from 'react'

type PropsType = {
  title: string
}

const SectionDivider = ({ title }: PropsType) => {
  return (
    <div className="mb-4 flex w-full items-center justify-start overflow-hidden">
      <div className="whitespace-nowrap bg-[#ebeff3] py-0.5 pr-6 font-semibold text-text-light dark:bg-[#121518] dark:text-text-dark">
        {title}
      </div>
      <Divider className="bg-divider-light dark:bg-divider-dark grow basis-0" />
    </div>
  )
}

export default SectionDivider
