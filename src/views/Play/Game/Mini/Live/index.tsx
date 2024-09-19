import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import SuccessModal from './SuccessModal'
import { Mini } from '../types'
import { getGameMini } from 'apis/game'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'

const MiniLive = () => {
  const router = useRouter()
  const { id } = router.query
  const { isLoaded, unityProvider, sendMessage } = useUnityContext({
    loaderUrl: '/build/Build/build.loader.js',
    dataUrl: '/build/Build/build.data',
    frameworkUrl: '/build/Build/build.framework.js',
    codeUrl: '/build/Build/build.wasm',
  })
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user).data
  const [data, setData] = useState<Mini>()
  const [rank, setRank] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const loadData = useCallback(() => {
    if (!id) {
      return
    }

    dispatch(setLoading(true))
    getGameMini(id as string)
      .then((res: Mini) => {
        setData(res)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [id, dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    if (isLoaded && !!data && !!userData) {
      const { title, avatar, lifeCount, refreshTime, refreshAmount, type, sponsor, team } = data
      const { id, kudosAmount } = userData
      const param = {
        title,
        avatar,
        lifeCount,
        refreshTime,
        refreshAmount,
        type,
        sponsorTitle: sponsor?.title || '',
        sponsorLogo: sponsor?.logo || '',
        userId: id,
        kudos: kudosAmount,
        teamName: team?.name || '',
        backgroundColor: team?.primaryColor || '#ffffff',
        accentColor: team?.secondaryColor || '#dddddd',
        textColor: team?.thirdColor || '#000000',
      }
      sendMessage('ReactController', 'LoadParameter', JSON.stringify(param))
    }
  }, [isLoaded, data, userData])

  const onClose = () => {
    router.push('/play')
    setShowSuccessModal(false)
  }

  return !!data && !!userData ? (
    <Fragment>
      <Head>
        <title>{`${data.title} | AG Nation`}</title>
      </Head>
      <Unity className="w-screen h-screen" unityProvider={unityProvider} />
      <SuccessModal show={showSuccessModal} onClose={onClose} data={data} rank={rank} />
    </Fragment>
  ) : null
}

export default MiniLive
