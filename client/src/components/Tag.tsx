import React from 'react'

type PropsType = {
  title: string
  className?: string
}

const Tag = ({ title, className }: PropsType) => {
  return (
    <div className={`select-none rounded px-1 py-0.5 text-sm font-semibold ${className}`}>
      {title}
    </div>
  )
}

export default Tag
