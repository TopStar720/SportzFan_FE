import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DetailsSection from './components/DetailsSection'
import PlaySection from './components/PlaySection'
import StepSection from './components/StepsSection'
import { Poll } from './types'
import { getPoll, checkPlayStatusPoll } from 'apis/poll'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'
import { getDateTimeString, getStatusString } from 'utils'

const Poll = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user).data
  const [data, setData] = useState<Poll>()
  const [played, setPlayed] = useState<boolean>(false)
  const [status, setStatus] = useState<string>()

  const loadData = useCallback(() => {
    if (!id || !userData.id) {
      return
    }

    dispatch(setLoading(true))
    getPoll(id as string)
      .then((res: Poll) => {
        checkPlayStatusPoll(id as string)
          .then(() => {
            setPlayed(true)
            setStatus(res?.isEnded ? 'Ended' : getStatusString(res?.start, res?.end))
            setData(res)
            dispatch(setLoading(false))
          })
          .catch(() => {
            setPlayed(false)
            setStatus(res?.isEnded ? 'Ended' : getStatusString(res?.start, res?.end))
            setData(res)
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
              <span className="text-24 text-sf-rose-700">You have participated in this poll.</span>
              <div className="flex gap-10">
                <button
                  className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14"
                  onClick={() => router.back()}
                >
                  <span className="text-14 text-white uppercase leading-18">Back</span>
                </button>
                {status === 'Ended' && (
                  <Link href={`/play/poll/${id}/result`}>
                    <button className="w-full sm:w-fit bg-danger rounded-[4px] px-56 py-12 my-14">
                      <span className="text-14 text-white uppercase leading-18">View Result</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : status === 'Upcoming' ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-24 text-golden">{`Poll starts ${getDateTimeString(data?.start)}`}</span>
              <button
                className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14"
                onClick={() => router.back()}
              >
                <span className="text-14 text-white uppercase leading-18">Back</span>
              </button>
            </div>
          </div>
        ) : status === 'Ended' ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-24 text-sf-rose-700">This poll has ended.</span>
              <div className="flex gap-10">
                <button
                  className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14"
                  onClick={() => router.back()}
                >
                  <span className="text-14 text-white uppercase leading-18">Back</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <PlaySection {...data} />
        )}
      </div>
    </Fragment>
  ) : null
}

export default Poll
