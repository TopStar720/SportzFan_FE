import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import DetailsSection from './components/DetailsSection'
import PlaySection from './components/PlaySection'
import StepSection from './components/StepsSection'
import { Prediction } from './types'
import { getGamePrediction, getGamePredictionResult } from 'apis/game'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'
import { getDateTimeString, getStatusString } from 'utils'
import PredictionResultModal from './components/PredictionResultModal'
import { ErrorData } from 'apis/types'

const Predict = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user).data
  const [data, setData] = useState<Prediction>()
  const [played, setPlayed] = useState<boolean>(false)
  const [status, setStatus] = useState<string>()
  const [result, setResult] = useState<Prediction>()
  const [showResultModal, setShowResultModal] = useState(false)

  const loadData = useCallback(() => {
    if (!id || !userData.id) {
      return
    }

    dispatch(setLoading(true))
    getGamePrediction(id as string)
      .then((prediction: Prediction) => {
        getGamePredictionResult(id as string)
          .then((res: Prediction) => {
            setData(prediction)
            setResult(res)
            setPlayed(true)
            setStatus(prediction?.isEnded ? 'Ended' : getStatusString(prediction?.start, prediction?.end))
            dispatch(setLoading(false))
          })
          .catch((err) => {
            const { statusCode, message } = err.response?.data?.message
            if (statusCode === 400 && message === "You haven't played this prediction yet.") {
              setPlayed(false)
            } else {
              setPlayed(true)
            }
            setData(prediction)
            setStatus(prediction?.isEnded ? 'Ended' : getStatusString(prediction?.start, prediction?.end))
            dispatch(setLoading(false))
          })
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [id, userData, dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  const showResult = () => {
    setShowResultModal(true)
  }

  const goBack = () => {
    router.back()
  }

  return !!data ? (
    <Fragment>
      <Head>
        <title>{`${data.title} | AG Nation`}</title>
      </Head>
      <DetailsSection {...data} />
      <div className="w-full h-34" />
      <div className="md:px-26">
        <StepSection {...data} />
        {played ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-20 sm:text-24 text-sf-rose-700">You have played this game.</span>
              <div className="flex gap-10">
                <button className="w-full w-fit bg-secondary rounded-[4px] px-42 sm:px-56 py-12 my-14" onClick={goBack}>
                  <span className="text-14 text-white uppercase leading-18">Back</span>
                </button>
                {data.isEnded ? (
                  <button
                    className="w-full w-fit bg-danger rounded-[4px] px-18 sm:px-56 py-12 my-14"
                    onClick={showResult}
                  >
                    <span className="text-14 text-white uppercase leading-18">My Results</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : status === 'Upcoming' ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-20 sm:text-24 text-golden">{`Game starts ${getDateTimeString(data?.start)}`}</span>
              <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14" onClick={goBack}>
                <span className="text-14 text-white uppercase leading-18">Back</span>
              </button>
            </div>
          </div>
        ) : status === 'Ended' ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-20 sm:text-24 text-sf-rose-700">This game has ended.</span>
              <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14" onClick={goBack}>
                <span className="text-14 text-white uppercase leading-18">Back</span>
              </button>
            </div>
          </div>
        ) : (
          <PlaySection {...data} />
        )}
        <PredictionResultModal show={showResultModal} onClose={() => setShowResultModal(false)} prediction={result} />
      </div>
    </Fragment>
  ) : null
}

export default Predict
