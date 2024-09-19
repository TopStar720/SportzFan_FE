import { createContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { ContextApi } from './types'

const defaultContextValue = {
  loaded: false,
  token: null,
  addToken: () => null,
}

export const AuthContext = createContext<ContextApi>(defaultContextValue)

export const AuthProvider = ({ children }) => {
  const [storedToken, setStoredToken] = useLocalStorage('token', null)
  const [token, setToken] = useState<string>(storedToken)
  const [loaded, setLoaded] = useState<boolean>(false)

  const addToken = (value: string) => {
    setToken(value)
    setStoredToken(value)
  }

  useEffect(() => {
    setToken(storedToken)
    setLoaded(true)
  }, [storedToken])

  const values = useMemo(
    () => ({
      loaded,
      token,
      addToken,
    }),
    [loaded, token],
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
