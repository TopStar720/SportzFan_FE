import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useStopwatch } from 'react-timer-hook'
import InviteModal from 'views/Play/components/InviteModal'
import InviteSuccessModal from 'views/Play/components/InviteSuccessModal'
import SuccessModal from './SuccessModal'
import PreviewModal from './PreviewModal'
import InfoSection from './InfoSection'
import { Poll, PollOption } from '../types'
import { getPoll, participatePoll } from 'apis/poll'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { classNames } from 'utils'

const PollLive = () => {
  const router = useRouter()
  const { id } = router.query
  const { minutes, seconds, pause } = useStopwatch({ autoStart: true, offsetTimestamp: new Date() })
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Poll>()
  const [selectedPollOption, setSelectedPollOption] = useState<string>('')
  const [played, setPlayed] = useState<boolean>(false)
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false)
  const [previewModalData, setPreviewModalData] = useState<PollOption>()
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [showInviteSuccessModal, setInviteSuccessModal] = useState<boolean>(false)

  const loadData = useCallback(() => {
    if (!id) {
      return
    }

    dispatch(setLoading(true))
    getPoll(id as string)
      .then((res: Poll) => {
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

  const handleVote = () => {
    dispatch(setLoading(true))
    participatePoll(data?.id, selectedPollOption)
      .then(() => {
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
        <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden w-full flex flex-col items-center text-center px-20 sm:px-44 pt-34 pb-50">
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/chart.svg" alt="" className="w-208" />
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
                {`${minuteTime} : ${secondTime}`} sec
              </span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-18 sm:text-20 leading-26 text-sf-gray-300 mt-20 sm:mt-24">{data?.description}</p>
              <div className="w-full h-30" />
              <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-12">
                {data?.options.map((item) => (
                  <div
                    key={`poll-option-card-${item.id}`}
                    className={classNames(
                      'relative overflow-hidden poll-card rounded-[5px]',
                      selectedPollOption === item.id
                        ? 'border border-sf-green-500 shadow-[0_-1px_10px_rgba(51,190,81,0.6)]'
                        : 'border border-sf-zinc-600',
                    )}
                  >
                    <img src={item.details} alt="" className="w-full" />
                    {selectedPollOption === item.id ? (
                      <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-sf-green-500 flex">
                        <img src="/assets/images/check.svg" alt="" className="w-6 m-auto" />
                      </div>
                    ) : (
                      <div className="absolute w-full h-full inset-0 controller-container">
                        <div className="controller w-full h-full">
                          <button
                            className="w-64 h-28 bg-secondary rounded-[4px]"
                            onClick={() => {
                              setPreviewModalData(item)
                              setShowPreviewModal(true)
                            }}
                          >
                            <span className="text-10 text-white uppercase leading-12">View</span>
                          </button>
                          <button
                            className="w-64 h-28 bg-danger rounded-[4px] ml-10"
                            onClick={() => setSelectedPollOption(item.id)}
                          >
                            <span className="text-10 text-white uppercase leading-12">Select</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-30" />
        <div className="flex">
          <button
            className="w-140 h-40 bg-danger rounded-[4px]"
            disabled={!selectedPollOption || played}
            onClick={handleVote}
          >
            <span className="text-14 text-white uppercase leading-18">Submit</span>
          </button>
        </div>
        <PreviewModal
          show={showPreviewModal}
          url={previewModalData?.details}
          onClose={() => setShowPreviewModal(false)}
          onSelect={() => {
            setSelectedPollOption(previewModalData?.id)
            setShowPreviewModal(false)
          }}
        />
        <SuccessModal show={showSuccessModal} onClose={onClose} data={data} onInvite={onInvite} />
        <InviteModal show={showInviteModal} onClose={() => setShowInviteModal(false)} onInvite={handleInvite} />
        <InviteSuccessModal show={showInviteSuccessModal} onClose={() => setInviteSuccessModal(false)} type="poll" />
      </div>
    </Fragment>
  ) : null
}

export default PollLive
