import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import Input from '~/components/Input'
import { GameItem } from '~/features/kanji/components/GamesList'
import InputWrapper from '~/features/user/components/InputWrapper'
import NoImage from '~/assets/no-image.jpg'
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
