import { createContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { ContextApi } from './types'

const defaultContextValue = {
  pwaStatus: null,
  onInstall: () => null,
  onReject: () => null,
}

export const PwaContext = createContext<ContextApi>(defaultContextValue)

export const PwaProvider = ({ children }) => {
  const [storedStatus, setStoredStatus] = useLocalStorage('pwa', null)
  const [status, setStatus] = useState<string>()
  const [prompt, setPrompt] = useState<any>()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  const onBeforeInstallPrompt = (e: any) => {
    e.preventDefault()
    setPrompt(e)
    if (storedStatus !== 'rejected') {
      storeStatus('uninstalled')
    } else {
      storeStatus(storedStatus)
    }
  }

  const onAppInstalled = () => {
    storeStatus('installed')
  }

  const storeStatus = (value: string) => {
    setStatus(value)
    setStoredStatus(value)
  }

  const onInstall = () => {
    if (!!prompt) {
      prompt.prompt()
    }
  }

  const onReject = () => {
    storeStatus('rejected')
  }

  const values = useMemo(
    () => ({
      pwaStatus: status,
      onInstall,
      onReject,
    }),
    [status, prompt],
  )

  return <PwaContext.Provider value={values}>{children}</PwaContext.Provider>
}
