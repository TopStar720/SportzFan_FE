import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { MAINTENANCE_MODE } from 'config'
import { deleteLocalStorageValue } from 'hooks/useLocalStorage'

export const MaintenanceWrapper = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    if (MAINTENANCE_MODE === 'true' && router.pathname !== '/maintenance') {
      deleteLocalStorageValue('token')
      router.push('/maintenance')
    }

    if (MAINTENANCE_MODE === 'false' && router.pathname === '/maintenance') {
      router.push('/')
    }
  }, [MAINTENANCE_MODE])

  return <>{children}</>
}
