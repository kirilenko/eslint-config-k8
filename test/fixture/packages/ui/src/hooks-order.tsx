import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext('light')

export const Theme = () => {
  const [open] = useState(false)
  const theme = useContext(ThemeContext)

  return <span>{open ? theme : null}</span>
}
