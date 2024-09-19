import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InfoSection from './InfoSection'
import { Poll, PollOption } from '../types'
import { getPoll, getPollResult } from 'apis/poll'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { classNames } from 'utils'

const PollResult = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Poll>()
  const [pollResult, setPollResult] = useState([])
  const [selectedPollOption, setSelectedPollOption] = useState<string>('')

  const loadData = useCallback(() => {
    if (!id) {
      return
    }

    dispatch(setLoading(true))
    getPoll(id as string)
      .then((res: Poll) => {
        getPollResult(id as string)
          .then((results: Poll) => {
            let tempResult: any = [...res.options]
            tempResult = tempResult.map((d) => {
              const optionResult = { ...d }
              if (results.participants.length > 0) {
                const voteCount = results.participants.filter((participant) => participant.pollOptionId === d.id).length
                optionResult.votePercent = ((voteCount / results.participants.length) * 100).toFixed(2)
              } else {
                optionResult.votePercent = 0
              }
              return optionResult
            })

            setPollResult(tempResult)
            setData(res)
            dispatch(setLoading(false))
          })
          .catch(() => {
            dispatch(setLoading(false))
          })
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [id, dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  const goBack = () => {
    router.back()
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
          <div className="flex justify-center items-center gap-20">
            <img src="/assets/images/chart-yellow.svg" alt="" className="w-56" />
            <span className="text-16 sm:text-24 text-sf-gray-300 leading-20">Results</span>
          </div>
          <div className="relative flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <p className="text-18 sm:text-20 leading-26 text-sf-gray-300 mt-20 sm:mt-24">{data?.description}</p>
              <div className="w-full h-30" />
              <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-12">
                {pollResult?.map((item) => (
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
                    <div className="absolute w-full h-full inset-0 controller-container flex justify-center items-center">
                      <span className="text-16 sm:text-24 text-sf-gray-300 leading-20">{item.votePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-30" />
        <div className="flex">
          <button className="w-140 h-40 bg-secondary rounded-[4px]" onClick={goBack}>
            <span className="text-14 text-white uppercase leading-18">Go Back</span>
          </button>
        </div>
      </div>
    </Fragment>
  ) : null
}

export default PollResult
