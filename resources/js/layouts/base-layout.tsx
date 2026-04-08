import React, { useEffect } from 'react'

import useNotifications from '@/stores/useNotifications'

interface BaseLayoutProps {
  children: React.ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const fetchNotifications = useNotifications((state) => state.fetchNotifications)

  useEffect(() => {
    fetchNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
