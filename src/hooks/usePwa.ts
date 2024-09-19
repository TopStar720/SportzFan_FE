import { useContext } from 'react'
import { PwaContext } from 'contexts/PwaContext'

const usePwa = () => {
  const pwaContext = useContext(PwaContext)

  if (pwaContext === undefined) {
    throw new Error('Pwa context undefined')
  }

  return pwaContext
}

export default usePwa
