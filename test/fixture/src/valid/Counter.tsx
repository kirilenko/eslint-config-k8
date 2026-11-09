import { useContext, useState } from 'react'

import type { Status } from '@/valid/status'
import { StatusContext } from '@/valid/status'

const label = (status: Status): string => {
  switch (status) {
    case 'idle':
      return 'Idle'
    case 'busy':
      return 'Busy'
  }
}

export const Counter = ({ step }: { step?: number }) => {
  const status = useContext(StatusContext)
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + (step ?? 1))} type="button">
      {label(status)}: {count}
    </button>
  )
}
