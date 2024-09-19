import Link from 'next/link'
import { getDateTimeString, getStatusString } from 'utils'
import { Poll } from '../../Play/Poll/types'

const MyPollDetailsCard = ({ id, title, team, start, end, kudosReward, isEnded }: Poll) => {
  const status = isEnded ? 'Ended' : getStatusString(start, end)

  return (
    <div className="w-full bg-dark border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
      <div className="flex">
        <div className="min-w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
          <img src="/assets/images/chart-yellow.svg" alt="" className="w-30" />
        </div>
        <div className="w-[calc(100%-80px)] px-6 py-12 sm:py-16">
          <div className="flex items-start justify-between">
            <p className="text-12 sm:text-14 leading-18 text-sf-gray-300">{title}</p>
            <div className="flex items-center md:-mt-4">
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
          </div>
          <div className="flex md:flex-row justify-between mt-6">
            <div className="flex flex-col md:flex-row justify-between mt-6">
              <div className="flex  items-center">
                <span className="text-10 leading-16 text-sf-yellow-700 font-poppins">{team?.name}</span>
                <div className="w-px h-16 bg-white/50 mx-10 hidden md:block" />
              </div>
              <div className="flex  items-center">
                <span className="text-10 leading-16 text-zinc-400 font-poppins">
                  {status === 'Upcoming' ? 'Starts On' : status === 'Live' ? 'Expires On' : 'Expired on'}
                </span>
                <span className="text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">
                  {status === 'Upcoming' ? getDateTimeString(start) : getDateTimeString(end)}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-10 md:mt-0">
              <Link href={`/play/poll/${id}`}>
                <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-12 py-8">
                  {status === 'Ended' ? 'View' : 'Vote'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPollDetailsCard
