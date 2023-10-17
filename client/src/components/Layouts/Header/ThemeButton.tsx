import React from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import useTheme from '~/hooks/useTheme'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      className="flex-center aspect-square"
      onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
    >
      <IconWrapper
        icon={theme === 'light' ? <BsMoonFill /> : <BsSunFill />}
        className="text-text-primary text-xl"
      />
    </Button>
  )
}

export default ThemeButton
