import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

import NoImage from '~/assets/no-image.jpg'

interface PropsType extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  className?: string
  src?: string
}

function Image({ className, src, ...props }: PropsType) {
  return (
    <img
      {...props}
      src={src ?? NoImage}
      loading="lazy"
      alt="kanjigami"
      className={`pointer-events-none relative z-[2] ${className}`}
    />
  )
}

export default Image
