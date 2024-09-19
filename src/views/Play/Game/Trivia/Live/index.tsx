import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { useStopwatch } from 'react-timer-hook'
import { useRouter } from 'next/router'
import InviteModal from 'views/Play/components/InviteModal'
import InviteSuccessModal from 'views/Play/components/InviteSuccessModal'
import SuccessModal from './SuccessModal'
import InfoSection from './InfoSection'
import { Trivia, TriviaAnswer } from '../types'
import { getGameTrivia, playGameTrivia } from 'apis/game'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { classNames } from 'utils'

const TriviaLive = () => {
  const router = useRouter()
  const { id } = router.query
  const { hours, minutes, seconds, pause } = useStopwatch({ autoStart: true, offsetTimestamp: new Date() })
  const hourTime = hours < 1 ? null : hours < 10 ? `0${hours}` : `${minutes}`
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Trivia>()
  const [answers, setAnswers] = useState<TriviaAnswer[]>([])
  const [step, setStep] = useState<number>(0)
  const [played, setPlayed] = useState<boolean>(false)
  const [score, setScore] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [showInviteSuccessModal, setInviteSuccessModal] = useState<boolean>(false)

  const loadData = useCallback(() => {
    if (!id) {
      return
    }

    dispatch(setLoading(true))
    getGameTrivia(id as string)
      .then((res: Trivia) => {
        setAnswers(res.triviaQuestions.map((item) => ({ questionId: item.id, optionId: null })))
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

  const handlePlay = () => {
    dispatch(setLoading(true))
    const takenTime = hours * 3600 + minutes * 60 + seconds
    playGameTrivia(data?.id, answers, takenTime)
      .then((res: { message: string }) => {
        setScore(`${res.message}/${data.triviaQuestions.length}`)
        setPlayed(true)
        pause()
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
        <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden w-full flex flex-col items-center text-center px-20 sm:px-44 pt-28 pb-40">
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/vs-big.svg" alt="" className="w-208" />
          </div>
          <div className="relative flex flex-col items-center text-center">
            <div className="flex items-center">
              <span className="text-10 sm:text-12 text-sf-zinc-400 font-poppins leading-20">Time Taken:</span>
              <img
                src="/assets/images/clock-yellow.svg"
                alt=""
                className="w-24 sm:w-28 mx-8 sm:mx-10 drop-shadow-[0_0_8px_rgba(204,143,0,0.5)]"
              />
              <span className="text-16 sm:text-24 text-sf-gray-300 leading-20">
                {!!hourTime ? `${hourTime} : ${minuteTime} : ${secondTime}` : `${minuteTime} : ${secondTime}`} sec
              </span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-18 sm:text-20 leading-26 text-sf-gray-300 mt-20 sm:mt-24">
                {data?.triviaQuestions[step]?.question}
              </p>
              <div className="w-full h-30" />
              <div className="w-full sm:w-auto grid sm:grid-cols-2 gap-x-30 gap-10 sm:gap-y-20">
                {data?.triviaQuestions[step]?.options.map((item) => (
                  <button
                    key={`trivia-question-option-${item.id}`}
                    className={classNames(
                      'sm:max-w-200 w-full rounded-[4px] px-16 py-10 text-left m-auto border',
                      answers[step]?.optionId === item.id
                        ? 'border-sf-green-500 bg-sf-green-500/20'
                        : 'border-sf-zinc-600',
                    )}
                    onClick={() =>
                      setAnswers((prev) => [
                        ...prev.slice(0, step),
                        { ...prev[step], optionId: item.id },
                        ...prev.slice(step + 1),
                      ])
                    }
                  >
                    <span className="text-14 text-white uppercase leading-18">{item.optionText}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-30" />
        <div className="flex">
          {step !== 0 ? (
            <button
              className="w-140 h-40 bg-secondary rounded-[4px] mr-20"
              onClick={() => setStep((prevState) => prevState - 1)}
            >
              <span className="text-14 text-white uppercase leading-18">Back</span>
            </button>
          ) : null}
          <button
            className="w-140 h-40 bg-danger rounded-[4px]"
            disabled={!answers[step].optionId || played}
            onClick={() => {
              if (step === answers.length - 1) {
                handlePlay()
              } else {
                setStep((prevState) => prevState + 1)
              }
            }}
          >
            <span className="text-14 text-white uppercase leading-18">
              {step === answers.length - 1 ? 'Submit' : 'Next'}
            </span>
          </button>
        </div>
        <SuccessModal
          show={showSuccessModal}
          onClose={onClose}
          data={data}
          takenTime={!!hourTime ? `${hourTime} : ${minuteTime} : ${secondTime}` : `${minuteTime} : ${secondTime}`}
          score={score}
          onInvite={onInvite}
        />
        <InviteModal show={showInviteModal} onClose={() => setShowInviteModal(false)} onInvite={handleInvite} />
        <InviteSuccessModal show={showInviteSuccessModal} onClose={() => setInviteSuccessModal(false)} type="game" />
      </div>
    </Fragment>
  ) : null
}

export default TriviaLive
