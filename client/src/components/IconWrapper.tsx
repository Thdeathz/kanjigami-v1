import React, { ReactElement } from 'react'
import { IconBaseProps, IconContext, IconType } from 'react-icons'

interface PropsType extends IconBaseProps {
  icon: ReactElement<IconType>
  className?: string
}

const IconWrapper = ({ icon, className }: PropsType) => {
  return (
    <IconContext.Provider value={{ className }}>
      <div>{icon}</div>
    </IconContext.Provider>
  )
}

export default IconWrapper
