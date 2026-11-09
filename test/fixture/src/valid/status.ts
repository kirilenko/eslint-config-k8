import { createContext } from 'react'

export type Status = 'busy' | 'idle'

export const StatusContext = createContext<Status>('idle')
