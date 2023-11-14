import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

import IconWrapper from './IconWrapper'

type PropsType = {
  className?: string
}

function Loading({ className }: PropsType) {
  return (
    <div className="flex-center">
      <IconWrapper icon={<AiOutlineLoading />} className={`animate-spin font-bold ${className}`} />
    </div>
  )
}

export default Loading
