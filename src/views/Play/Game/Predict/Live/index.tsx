import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InviteModal from 'views/Play/components/InviteModal'
import InviteSuccessModal from 'views/Play/components/InviteSuccessModal'
import ControlSection from './ControlSection'
import InfoSection from './InfoSection'
import SuccessModal from './SuccessModal'
import { Prediction, PredictScores } from '../types'
import { getGamePrediction, playGamePrediction } from 'apis/game'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'

const PredictLive = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Prediction>()
  const [scores, setScores] = useState<PredictScores>({
    mainPredictScore: 0,
    oppositionPredictScore: 0,
  })
  const [played, setPlayed] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [showInviteSuccessModal, setInviteSuccessModal] = useState<boolean>(false)

  const loadData = useCallback(() => {
    if (!id) {
      return
    }

    dispatch(setLoading(true))
    getGamePrediction(id as string)
      .then((res: Prediction) => {
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

  const onChange = (type: string, value: number | string) => {
    setScores((prev) => ({ ...prev, [type]: value }))
  }

  const handlePlay = () => {
    dispatch(setLoading(true))
    playGamePrediction(data?.id, scores)
      .then(() => {
        setPlayed(true)
        setShowSuccessModal(true)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  const onClose = () => {
    router.push('/play')
    setShowSuccessModal(false)
  }

  const onInvite = () => {
    setShowSuccessModal(false)
    setTimeout(() => {
      setShowInviteModal(true)
    }, 100)
  }

  const handleInvite = (users: string[]) => {
    setShowInviteModal(false)
    setTimeout(() => {
      setInviteSuccessModal(true)
    }, 100)
  }

  return !!data ? (
    <Fragment>
      <Head>
        <title>{`${data.title} | AG Nation`}</title>
      </Head>
      <div className="flex flex-col items-center">
        <div className="hidden sm:block w-full mb-18">
          <InfoSection {...data} />
        </div>
        <ControlSection data={data} scores={scores} onChange={onChange} />
        <button
          className="bg-danger rounded-[4px] px-40 py-12 mt-36"
          disabled={played || scores.oppositionPredictScore === '' || scores.mainPredictScore === ''}
          onClick={handlePlay}
        >
          <span className="text-14 text-white uppercase leading-18">Submit</span>
        </button>
        <SuccessModal show={showSuccessModal} onClose={onClose} data={data} onInvite={onInvite} />
        <InviteModal show={showInviteModal} onClose={() => setShowInviteModal(false)} onInvite={handleInvite} />
        <InviteSuccessModal show={showInviteSuccessModal} onClose={() => setInviteSuccessModal(false)} type="game" />
      </div>
    </Fragment>
  ) : null
}

export default PredictLive
