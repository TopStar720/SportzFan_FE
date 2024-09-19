import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLoader from 'components/PageLoader'
import useAuth from 'hooks/useAuth'

export const AuthenticatedWrapper = ({ children }) => {
  const router = useRouter()
  const { loaded, token } = useAuth()

  useEffect(() => {
    if (loaded && !token) {
      router.push('/')
    }
  }, [loaded, token])

  if (!loaded || (loaded && !token)) {
    return <PageLoader />
  }

  return <>{children}</>
}

export const UnauthenticatedWrapper = ({ children }) => {
  const router = useRouter()
  const { loaded, token } = useAuth()

  useEffect(() => {
    if (loaded && token) {
      router.push('/home')
    }
  }, [loaded, token])

  if (!loaded || (loaded && token)) {
    return <PageLoader />
  }

  return <>{children}</>
}
