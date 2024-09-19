import { Provider } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { store } from './store'
import { socket, SocketContext } from 'contexts/SocketContext'
import { STRIPE_PK } from './config'
import { AuthProvider } from 'contexts/AuthContext'
import { PwaProvider } from 'contexts/PwaContext'

const stripePromise = loadStripe(STRIPE_PK)

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <AuthProvider>
          <PwaProvider>
            <Elements stripe={stripePromise}>{children}</Elements>
          </PwaProvider>
        </AuthProvider>
      </SocketContext.Provider>
    </Provider>
  )
}

export default Providers
