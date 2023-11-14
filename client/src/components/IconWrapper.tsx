import React, { ReactElement, useMemo } from 'react'
import { IconBaseProps, IconContext, IconType } from 'react-icons'

interface PropsType extends IconBaseProps {
  icon: ReactElement<IconType>
  className?: string
}

function IconWrapper({ icon, className }: PropsType) {
  const value = useMemo(() => ({ className }), [className])

  return (
    <IconContext.Provider value={value}>
      <div>{icon}</div>
    </IconContext.Provider>
  )
}

export default IconWrapper
