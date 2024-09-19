import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import MatchCard from 'views/Match/components/MatchCard'
import Slider from './Slider'
import { useAppSelector } from 'hooks'
import { MatchData } from 'views/Match/types'

const MatchesSection = () => {
  const matches = useAppSelector((state) => state.matches).data
  const [upcomingMatches, setUpcomingMatches] = useState<MatchData[]>([])

  useEffect(() => {
    if (matches.length > 3) {
      setUpcomingMatches(matches.slice(0, 3))
    } else {
      setUpcomingMatches(matches)
    }
  }, [matches])

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Upcoming Matches</p>
        <Link href="/match/all">
          <button className="flex items-center pt-4">
            <span className="text-12 sm:text-14 text-sf-rose-700 leading-18 whitespace-nowrap">SEE All</span>
            <img src="/assets/images/forward.svg" alt="" className="h-12 sm:h-16 ml-4 sm:ml-8" />
          </button>
        </Link>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-12 2xl:gap-18 my-20">
        {upcomingMatches.map((item) => (
          <MatchCard key={`match-item-${item.id}`} {...item} />
        ))}
      </div>
      <div className="block md:hidden w-full">
        <Slider>
          {upcomingMatches.map((item) => (
            <div key={`match-item-${item.id}`} className="px-10 pt-20 pb-40">
              <MatchCard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default MatchesSection
