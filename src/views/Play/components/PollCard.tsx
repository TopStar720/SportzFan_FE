import Link from 'next/link'
import { getDateTimeString, getStatusString } from 'utils'
import { Poll } from '../../../views/Play/Poll/types'

const PollCard = ({ id, title, start, end, isEnded, isPlayed }: Poll) => {
  const status = isEnded ? 'Ended' : getStatusString(start, end)

  return (
    <Link href={`/play/poll/${id}`}>
      <button className="w-full rounded-[4px] relative bg-dark border border-sf-zinc-600">
        <div className="absolute w-full h-full flex justify-center items-center">
          <img src="/assets/images/chart.svg" alt="" className="h-138" />
        </div>
        <div className="absolute top-8 right-10 flex items-center">
          {status === 'Live' ? (
            <>
              <span className="w-[5px] h-[5px] bg-sf-green-500 rounded-full" />
              <span className="text-10 text-sf-green-500 font-poppins leading-16 ml-[3px]">Live</span>
            </>
          ) : status === 'Upcoming' ? (
            <>
              <span className="w-[5px] h-[5px] bg-sf-yellow-500 rounded-full" />
              <span className="text-8 text-sf-yellow-500 font-poppins leading-12 ml-[3px]">Upcoming</span>
            </>
          ) : (
            <>
              <span className="w-[5px] h-[5px] bg-sf-red-600 rounded-full" />
              <span className="text-10 text-sf-red-600 font-poppins leading-16 ml-[3px]">Ended</span>
            </>
          )}
        </div>
        <div className="absolute top-8 left-10 flex items-center">
          {isPlayed ? (
            <div className="flex items-center ">
              <img src={'/assets/images/check-green.svg'} className="h-10" />
              <span className="text-10 text-sf-green-500 font-poppins leading-16 ml-[3px]">Played</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-col justify-between items-center pb-20 2xl:pb-24 px-18 2xl:px-30">
          <div className="min-h-54 flex justify-center items-center my-80 sm:my-100 md:my-62 2xl:my-74">
            <p className="text-12 xl:text-14 text-sf-gray-300 leading-18 text-center ">{title}</p>
          </div>
          <p className="text-8 xl:text-10 text-sf-yellow-700 leading-16 text-center">
            {status === 'Upcoming'
              ? `Starts ${getDateTimeString(start)}`
              : status === 'Live'
              ? `Expires ${getDateTimeString(end)}`
              : `Expired ${getDateTimeString(end)}`}
          </p>
        </div>
      </button>
    </Link>
  )
}

export default PollCard
