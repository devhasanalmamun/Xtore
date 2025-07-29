import { useCallback } from 'react'

export function useInitials() {
  return useCallback((fullName: string): string => {
    const names = fullName.trim().split(' ')

    if (names.length === 0) return ''
    if (names.length === 1) return names[0].charAt(0).toUpperCase()

    const safeNames = Array.isArray(names) ? names : []

    const firstInitial = safeNames[0].charAt(0).toUpperCase()
    const lastInitial = safeNames[safeNames.length - 1].charAt(0).toUpperCase()

    return `${firstInitial}${lastInitial}`.toUpperCase()
  }, [])
}
