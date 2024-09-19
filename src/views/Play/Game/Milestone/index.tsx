import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DetailsSection from './components/DetailsSection'
import StepSection from './components/StepsSection'
import { Milestone, PlayMilestone } from './types'
import { getGameMilestone, playGameMilestone } from 'apis/game'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'
import { getDateTimeString, getStatusString } from 'utils'

const Milestone = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.user).data
  const [data, setData] = useState<Milestone>()
  const [played, setPlayed] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [eligible, setEligible] = useState<boolean>(false)
  const [status, setStatus] = useState<string>()

  const loadData = useCallback(() => {
    if (!id || !userData.id) {
      return
    }

    dispatch(setLoading(true))
    getGameMilestone(id as string)
      .then((res: Milestone) => {
        const statusString = res?.isEnded ? 'Ended' : getStatusString(res?.start, res?.end)
        setStatus(statusString)
        setData(res)
        playGameMilestone(id as string)
          .then((playMilestone: PlayMilestone) => {
            setPlayed(true)
            if (playMilestone.checkInFlag && playMilestone.balanceFlag) {
              setChecked(true)
              setEligible(true)
            } else if (!playMilestone.balanceFlag) {
              setEligible(false)
            } else {
              setEligible(true)
              setChecked(false)
            }

            dispatch(setLoading(false))
          })
          .catch(() => {
            dispatch(setLoading(false))
          })
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [id, dispatch, userData])

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
      <DetailsSection {...data} />
      <div className="w-full h-34" />
      <div className="md:px-26">
        <StepSection {...data} />
        {status === 'Upcoming' ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-24 text-golden">{`Game starts ${getDateTimeString(data?.start)}`}</span>
              <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14" onClick={goBack}>
                <span className="text-14 text-white uppercase leading-18">Back</span>
              </button>
            </div>
          </div>
        ) : status === 'Ended' ? (
          <div className="xl:w-fit rounded-[5px] py-22">
            <div className="flex flex-col justify-center items-center sm:items-start text-center">
              <span className="text-24 text-sf-rose-700">This game has ended.</span>
              <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 my-14" onClick={goBack}>
                <span className="text-14 text-white uppercase leading-18">Back</span>
              </button>
            </div>
          </div>
        ) : played ? (
          checked ? (
            <div className="rounded-[5px]">
              <div className="relative w-full h-120">
                <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-90 -mt-10" />
                </div>
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src="/assets/images/like-yellow.svg" alt="" className="w-46 -mt-20" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-center -mt-30">
                <span className="text-20 font-bold text-golden">You are eligible to play!</span>
                <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-56 py-12 mt-30" onClick={goBack}>
                  <span className="text-14 text-white uppercase leading-18">Back</span>
                </button>
              </div>
            </div>
          ) : eligible ? (
            <div className="w-fit bg-warning flex flex-col sm:flex-row items-center px-24 py-10 rounded-[25px] mt-20">
              <div className="flex items-center">
                <img src="/assets/images/padlock-yellow.svg" alt="" className="h-20" />
                <span className="text-12 text-white font-poppins leading-20 ml-14 mr-6">
                  You are ineligible to play. You must be checked in to the game to play.
                </span>
              </div>
              <div className="flex mt-10 sm:mt-0">
                <Link href={`/match/${data?.match?.id}`}>
                  <button className="w-80 h-30 bg-danger rounded-[5px]">
                    <span className="text-10 text-white uppercase leading-12">Check-in</span>
                  </button>
                </Link>
                <button className="w-80 h-30 bg-secondary rounded-[5px] ml-8" onClick={goBack}>
                  <span className="text-10 text-white uppercase leading-12">Back</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-fit bg-warning flex flex-col sm:flex-row items-center px-24 py-10 rounded-[25px] mt-20">
              <div className="flex items-center">
                <img src="/assets/images/padlock-yellow.svg" alt="" className="h-20" />
                <span className="text-12 text-white font-poppins leading-20 ml-14 mr-6">
                  You need {Math.floor(data.eligbleKudos - userData.kudosAmount)} more kudos to play, You have to buy or
                  earn kudos
                </span>
              </div>
              <div className="flex mt-10 sm:mt-0">
                <Link href="/play">
                  <button className="w-[50px] h-[25px] bg-danger rounded-[5px]">
                    <span className="text-10 text-white uppercase leading-12">EARN</span>
                  </button>
                </Link>
              </div>
            </div>
          )
        ) : null}
      </div>
    </Fragment>
  ) : null
}

export default Milestone
