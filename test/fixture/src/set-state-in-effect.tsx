import { useEffect, useState } from 'react'

export const Ready = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return <span>{String(ready)}</span>
}
