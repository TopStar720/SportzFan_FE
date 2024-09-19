import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import PollCard from '../components/PollCard'
import Slider from '../components/Slider'
import { useAppSelector } from 'hooks'
import { Poll } from '../Poll/types'

const PollsSection = () => {
  const polls = useAppSelector((state) => state.polls.data)
  const [latestPolls, setLatestPolls] = useState<Poll[]>([])

  useEffect(() => {
    if (polls.length > 3) {
      setLatestPolls(polls.slice(0, 3))
    } else {
      setLatestPolls(polls)
    }
  }, [polls])

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/images/chart-yellow.svg" alt="" className="h-22 mr-10" />
          <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Polls</p>
        </div>
        <Link href="/play/poll/all">
          <button className="flex items-center mt-4">
            <span className="text-12 sm:text-14 text-sf-rose-700 leading-18 whitespace-nowrap">SEE All</span>
            <img src="/assets/images/forward.svg" alt="" className="h-12 sm:h-16 ml-4 sm:ml-8" />
          </button>
        </Link>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Vote on team decisions and have your voice heard.
      </p>
      <div className="hidden md:grid grid-cols-3 gap-12 2xl:gap-18 mt-16">
        {latestPolls.map((item) => (
          <PollCard key={`poll-item-${item.id}`} {...item} />
        ))}
      </div>
      <div className="block md:hidden w-full">
        <Slider>
          {latestPolls.map((item) => (
            <div key={`poll-item-${item.id}`} className="px-10 pt-20 pb-40">
              <PollCard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default PollsSection
