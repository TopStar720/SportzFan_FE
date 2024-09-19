import Link from 'next/link'
import { MatchData } from '../types'
import { getDateTimeString } from 'utils'

const MatchCard = ({ id, title, homeTeam, awayTeam, start }: MatchData) => {
  return (
    <Link href={`/match/${id}`}>
      <button className="w-full border border-sf-zinc-600 bg-dark rounded-[4px] relative px-18 2xl:px-30">
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <img src="/assets/images/vs.svg" alt="" className="h-full" />
        </div>
        <div className="w-full flex justify-around items-center pt-70 pb-50 sm:pt-110 sm:pb-90 md:pt-20 md:pb-8 xl:pt-30 xl:pb-18 2xl:pt-68 2xl:pb-40">
          <img src={homeTeam?.logo} alt="" className="!w-auto h-40 xl:h-48" />
          <img src="/assets/images/vs-yellow.svg" alt="" className="!w-auto h-46 md:h-36 xl:h-46" />
          <img src={awayTeam?.logo} alt="" className="!w-auto h-40 xl:h-48" />
        </div>
        <p className="min-h-36 text-14 text-sf-gray-300 leading-18 text-center">{title}</p>
        <p className="text-10 text-sf-yellow-700 leading-16 text-center mb-30 md:mb-22 xl:mb-30 mt-8">{`Starts ${getDateTimeString(
          start,
        )}`}</p>
      </button>
    </Link>
  )
}

export default MatchCard
