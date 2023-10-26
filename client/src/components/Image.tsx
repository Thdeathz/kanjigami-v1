import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

import NoImage from '~/assets/images/no-image.png'

interface PropsType
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src?: string
}

const Image = ({ src, ...props }: PropsType) => {
  return <img {...props} src={src ?? NoImage} loading="lazy" />
}

export default Image
