import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [theme])

  return { theme, setTheme }
}

export default useTheme
