import { useContext, useState } from 'react'

import { StatusContext } from '@/valid/status'

export const Status = () => {
  const [open] = useState(false)
  const status = useContext(StatusContext)

  return <span>{open ? status : null}</span>
}
