import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const { body } = document
    if (theme === 'dark') {
      body.classList.add('dark')
      body.style.colorScheme = 'dark'
    } else {
      body.classList.remove('dark')
      body.style.colorScheme = 'light'
    }
  }, [theme])

  return { isDarkMode: theme === 'dark', theme, setTheme }
}

export default useTheme
