import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import ProfileDetailsSection from './components/ProfileDetailsSection'

import { getMyAssetList } from 'apis/asset'
import { getMyChallengeList } from 'apis/challenge'
import { getMyGameList } from 'apis/game'
import { getLeaderboard } from 'apis/user'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { getTeamData } from 'store/user'
import { getOrdinalSuffix } from 'utils'
import { getMyPollList } from 'apis/poll'

const Rewards = () => {
  const dispatch = useAppDispatch()
  const [myAssetCount, setMyAssetCount] = useState<string>('0')
  const [myPollCount, setMyPollCount] = useState<string>('0')
  const [myGameCount, setMyGameCount] = useState<string>('0')
  const [myChallengeCount, setMyChallengeCount] = useState<string>('0')
  const [myRank, setMyRank] = useState<string>('0')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    Promise.all([
      getMyChallengeList(0, 10),
      getMyPollList(0, 10),
      getMyAssetList(0, 10),
      getMyGameList(0, 10),
      getLeaderboard(),
    ])
      .then((results) => {
        setMyChallengeCount(results[0]?.count)
        setMyPollCount(results[1]?.count)
        setMyAssetCount(results[2]?.count)
        setMyGameCount(results[3]?.count)
        setMyRank(results[4]?.[0]?.rank)
        setIsLoaded(true)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(true))
      })
  }, [dispatch])

  useEffect(() => {
    fetchData()
    dispatch(getTeamData())
  }, [dispatch, fetchData])

  return (
    <Fragment>
      <div className="w-full h-10" />
      <ProfileDetailsSection />
      <div className="w-full h-40" />
      {isLoaded ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 xs:gap-16">
          <div className="flex flex-col justify-center items-center bg-info rounded-[4px] border border-sf-zinc-600 px-10 pt-12 pb-18 xs:pt-20 xs:pb-26">
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
                <img src="/assets/images/handshake-yellow.svg" alt="" className="w-60" />
              </div>
              <span className="text-36 text-sf-gray-300">{myChallengeCount}</span>
            </div>
            <p className="min-h-36 text-12 xs:text-14 text-sf-gray-300 text-center">Challenges In Progress</p>
            <Link href="/rewards/challenges">
              <button className="flex items-center">
                <span className="text-10 xs:text-12 text-sf-rose-700 whitespace-nowrap">View Challenges</span>
                <img src="/assets/images/forward.svg" alt="" className="h-10 xs:h-12 ml-4" />
              </button>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center bg-info rounded-[4px] border border-sf-zinc-600 px-10 pt-12 pb-18 xs:pt-20 xs:pb-26">
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
                <img src="/assets/images/chart-yellow.svg" alt="" className="w-48" />
              </div>
              <span className="text-36 text-sf-gray-300">{myPollCount}</span>
            </div>
            <p className="min-h-36 text-12 xs:text-14 text-sf-gray-300 text-center">My Polls</p>
            <Link href="/rewards/polls">
              <button className="flex items-center">
                <span className="text-10 xs:text-12 text-sf-rose-700 whitespace-nowrap">View Polls</span>
                <img src="/assets/images/forward.svg" alt="" className="h-10 xs:h-12 ml-4" />
              </button>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center bg-info rounded-[4px] border border-sf-zinc-600 px-10 pt-12 pb-18 xs:pt-20 xs:pb-26">
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
                <img src="/assets/images/hand-star-yellow.svg" alt="" className="w-42" />
              </div>
              <span className="text-36 text-sf-gray-300">{myAssetCount}</span>
            </div>
            <p className="min-h-36 text-12 xs:text-14 text-sf-gray-300 text-center">My Assets</p>
            <Link href="/rewards/assets">
              <button className="flex items-center">
                <span className="text-10 xs:text-12 text-sf-rose-700 whitespace-nowrap">View Assets</span>
                <img src="/assets/images/forward.svg" alt="" className="h-10 xs:h-12 ml-4" />
              </button>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center bg-info rounded-[4px] border border-sf-zinc-600 px-10 pt-12 pb-18 xs:pt-20 xs:pb-26">
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
                <img src="/assets/images/balls-yellow.svg" alt="" className="w-48" />
              </div>
              <span className="text-36 text-sf-gray-300">{myGameCount}</span>
            </div>
            <p className="min-h-36 text-12 xs:text-14 text-sf-gray-300 text-center">My Active Games</p>
            <Link href="/rewards/games">
              <button className="flex items-center">
                <span className="text-10 xs:text-12 text-sf-rose-700 whitespace-nowrap">View Games</span>
                <img src="/assets/images/forward.svg" alt="" className="h-10 xs:h-12 ml-4" />
              </button>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center bg-info rounded-[4px] border border-sf-zinc-600 px-10 pt-12 pb-18 xs:pt-20 xs:pb-26">
            <div className="flex justify-center items-center">
              <div className="w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
                <img src="/assets/images/rankings-yellow.svg" alt="" className="w-44" />
              </div>
              <span className="text-36 text-sf-gray-300">
                {myRank}
                <sup className="text-16 -top-16">{getOrdinalSuffix(parseInt(myRank))}</sup>
              </span>
            </div>
            <p className="min-h-36 text-12 xs:text-14 text-sf-gray-300 text-center">My Rank</p>
            <Link href="/leaderboard">
              <button className="flex items-center">
                <span className="text-10 xs:text-12 text-sf-rose-700 whitespace-nowrap">View Leaderboard</span>
                <img src="/assets/images/forward.svg" alt="" className="h-10 xs:h-12 ml-4" />
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Rewards
