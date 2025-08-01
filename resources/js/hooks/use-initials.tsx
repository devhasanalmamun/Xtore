import { useCallback } from 'react'

export function useInitials() {
  return useCallback((first_name: string, last_name: string): string => {
    const firstInitial = first_name[0].toUpperCase()
    const lastInitial = last_name[0].toUpperCase()

    return `${firstInitial}${lastInitial}`.toUpperCase()
  }, [])
}
