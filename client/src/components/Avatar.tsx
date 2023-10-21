import React from 'react'

import DefaultAvatar from '~/assets/default-avatar.jpg'

type PropsType = {
  src?: string
  className?: string
  size?: 'small' | 'base' | 'large'
}

const Avatar = ({ src, className, size = 'base' }: PropsType) => {
  const height = size === 'small' ? 'h-[1.75rem]' : size === 'base' ? 'h-[2.25rem]' : 'h-[2.75rem]'

  return (
    <button className={`${className} rounded-full transition-all hover:opacity-90 active:scale-90`}>
      <img
        src={src ?? DefaultAvatar}
        alt="avatar"
        className={`aspect-square rounded-full object-contain ${height}`}
      />
    </button>
  )
}

export default Avatar
