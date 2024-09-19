import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import ChallengeCard from '../components/ChallengeCard'
import Slider from '../components/Slider'
import { ChallengeTypeEnum, StatusEnum } from '../types'
import { useAppSelector } from 'hooks'

const ChallengesSection = () => {
  const challenges = useAppSelector((state) => state.challenges.data)
  const [latestChallenges, setLatestChallenges] = useState([])

  useEffect(() => {
    if (challenges.length > 3) {
      setLatestChallenges(challenges.slice(0, 3))
    } else {
      setLatestChallenges(challenges)
    }
  }, [challenges])

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/images/handshake-yellow.svg" alt="" className="h-22 mr-10" />
          <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Challenges</p>
        </div>
        <Link href="/play/challenge/all">
          <button className="flex items-center mt-4">
            <span className="text-12 sm:text-14 text-sf-rose-700 leading-18 whitespace-nowrap">SEE All</span>
            <img src="/assets/images/forward.svg" alt="" className="h-12 sm:h-16 ml-4 sm:ml-8" />
          </button>
        </Link>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Complete challenges to build your fan rating and build your collection of achievement badges.
      </p>
      <div className="hidden md:grid grid-cols-3 gap-12 2xl:gap-18 mt-16">
        {latestChallenges.map((item) => (
          <ChallengeCard key={`challenge-item-${item.id}`} {...item} />
        ))}
      </div>
      <div className="block md:hidden w-full">
        <Slider>
          {latestChallenges.map((item) => (
            <div key={`challenge-item-${item.id}`} className="px-10 pt-20 pb-40">
              <ChallengeCard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default ChallengesSection
