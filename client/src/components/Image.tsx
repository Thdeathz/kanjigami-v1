import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

import LockIcon from '~/assets/lock.png'

interface PropsType extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  className?: string
  src?: string
}

function Image({ className, src, ...props }: PropsType) {
  return (
    <img
      {...props}
      src={src ?? LockIcon}
      loading="lazy"
      alt="kanjigami"
      className={`pointer-events-none relative z-[2] ${className}`}
    />
  )
}

export default Image
