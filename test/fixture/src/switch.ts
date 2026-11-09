import type { Status } from '@/valid/status'

export const code = (status: Status): number => {
  switch (status) {
    case 'idle':
      return 0
  }

  return -1
}
