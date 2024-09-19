import { FC, Fragment, useEffect } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Providers from 'Providers'
import '../styles/globals.scss'
import Loader from 'components/Loader'
import { useSelector } from 'react-redux'
import { AppState } from 'store/types'
import { socket } from 'contexts/SocketContext'
import { useAppDispatch, useAppSelector } from 'hooks'
import useAuth from 'hooks/useAuth'
import { getUserData } from 'store/user'
import { MessageData } from 'views/Notification/types'
import { addNewNotificaiton, getNotifications, getUnreadCount, refreshNotifications } from 'store/notifications'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from 'config'
import PwaPrompt from 'components/PwaPrompt'

function MyApp(props: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="description" content="Web site for AG Nation" />
        <title>AG Nation</title>
      </Head>

      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_MEASUREMENT_ID}',  {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <Providers>
        <App {...props} />
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  title?: string
  Layout?: FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the title defined at the page level, if available
  const title = Component.title || ''
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment

  const dispatch = useAppDispatch()
  const { token } = useAuth()
  const { loading } = useSelector<any, AppState>((state) => state.app)
  const { data } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!!token) {
      dispatch(getUserData())
    }
  }, [dispatch, token])

  useEffect(() => {
    if (data.id !== '') {
      dispatch(getUnreadCount())
      dispatch(getNotifications({ skip: 0, take: 5 }))
    }

    socket.connect()

    socket.on('message', function (msg: MessageData) {
      if (msg.userId === data.id) {
        dispatch(addNewNotificaiton(msg))
        dispatch(refreshNotifications())
      }
    })

    return function disconnectSocket() {
      socket.disconnect()
    }
  }, [data.id])

  useEffect(() => {
    if (data.id !== '' && socket) {
      socket.emit('join', { userId: data.id })
    }
  }, [data.id, socket])

  return (
    <>
      <Head>
        <title>{!!title ? `${title} | AG Nation` : 'AG Nation'}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
        {loading ? <Loader /> : null}
        <PwaPrompt />
      </Layout>
    </>
  )
}

export default MyApp
