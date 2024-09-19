import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DetailsSection from './components/DetailsSection'
import { dateToDateAndTime } from 'utils'
import { useAppSelector } from 'hooks'
import { getChallengeSurvey, getPlaySurvey } from 'apis/challenge'

const Survey = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useAppSelector((state) => state.user)
  const [playedStatus, setPlayedStatus] = useState(false)
  const [challenge, setChallenge] = useState({
    title: '',
    description: '',
    isUpcoming: false,
    isEnded: false,
    startDate: '',
    startTime: '',
  })

  const getCheckIn = async (id: string) => {
    const data = await getChallengeSurvey(id)
    data.isUpcoming = data.start > new Date().toISOString()
    data.isEnded = data.end < new Date().toISOString()

    const startDateTime = dateToDateAndTime(new Date(data.start))
    const endDateTime = dateToDateAndTime(new Date(data.end))
    const matchStart = dateToDateAndTime(new Date(data.match.start), 1)

    data.startDate = startDateTime.date
    data.startTime = startDateTime.time
    data.start = `${startDateTime.time} ${startDateTime.date}`
    data.end = `${endDateTime.time} ${endDateTime.date}`
    data.match.startDate = matchStart.date
    data.match.startTime = matchStart.time

    setChallenge(data)
  }

  const getPlayData = async (id: string) => {
    const playData = await getPlaySurvey(id)
    if (playData?.playSurvey?.length > 0) {
      if (playData.playSurvey.map((d: { userId: string }) => d.userId).includes(data.id)) {
        setPlayedStatus(true)
      } else {
        setPlayedStatus(false)
      }
    } else {
      setPlayedStatus(false)
    }
  }

  useEffect(() => {
    if (id) {
      getCheckIn(String(id))
    }
  }, [id])

  useEffect(() => {
    if (id) {
      getPlayData(String(id))
    }
  }, [id, data])

  return (
    <Fragment>
      <Head>
        <title>{`${challenge?.title} | AG Nation`}</title>
      </Head>
      <DetailsSection data={challenge} />
      <div className="md:px-26">
        <p className="text-14 text-sf-neutral-300 font-poppins leading-20 mt-30">{challenge.description}</p>
        {playedStatus ? (
          <div className="mt-34">
            <div className="xl:w-fit rounded-[5px] px-24">
              <div className="flex flex-col justify-center items-center text-center  gap-20">
                <span className="text-24 text-sf-rose-700">You have completed this Survey</span>
                <Link href={`/play`}>
                  <button className="bg-secondary rounded-[4px] block m-auto sm:m-0 px-56 py-12">
                    <span className="text-14 text-white uppercase leading-18">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : challenge.isEnded ? (
          <div className="mt-34">
            <div className="xl:w-fit rounded-[5px] px-24">
              <div className="flex flex-col justify-center items-center text-center  gap-20">
                <span className="text-24 text-sf-rose-700">Challenge Ended</span>
                <Link href={`/play`}>
                  <button className="bg-secondary rounded-[4px] block m-auto sm:m-0 px-56 py-12">
                    <span className="text-14 text-white uppercase leading-18">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : challenge.isUpcoming ? (
          <div className="mt-34">
            <div className="xl:w-fit rounded-[5px] px-24">
              <div className="flex flex-col justify-center items-center text-center gap-20">
                <span className="text-24 point-value">
                  Challenge Starts {challenge?.startDate} | {challenge?.startTime}
                </span>
                <Link href={`/play`}>
                  <button className="bg-secondary rounded-[4px] block m-auto sm:m-0 px-56 py-12">
                    <span className="text-14 text-white uppercase leading-18">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-34 flex  gap-10">
            <Link href={`/play`}>
              <button className="bg-secondary rounded-[4px] block m-auto sm:m-0 px-32 py-12">
                <span className="text-14 text-white uppercase leading-18">Back</span>
              </button>
            </Link>
            <Link href={`/play/challenge/survey/${id}/live`}>
              <button
                disabled={challenge.isEnded || challenge.isUpcoming}
                className="bg-danger rounded-[4px] block m-auto sm:m-0 px-20 py-12"
              >
                <span className="text-14 text-white uppercase leading-18">Let's Play</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Survey
