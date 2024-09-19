import Link from 'next/link'
import { getDateTimeString, getStatusString } from 'utils'
import { Poll } from '../../Play/Poll/types'

const PollDetailsCard = ({ id, title, team, start, end, kudosReward, isEnded, isPlayed }: Poll) => {
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
              {isPlayed ? (
                <div className="flex items-center justify-center w-70">
                  <img src={'/assets/images/check-green.svg'} className="h-10" />
                  <span className="text-10 text-sf-green-500 font-poppins leading-16 ml-[3px]">Played</span>
                </div>
              ) : (
                ''
              )}
              {status === 'Live' ? (
                <>
                  <span className="w-[5px] h-[5px] bg-sf-green-500 rounded-full" />
                  <span className="text-10 text-sf-green-500 font-poppins leading-16 ml-[3px]  w-30">Live</span>
                </>
              ) : status === 'Upcoming' ? (
                <>
                  <span className="w-[5px] h-[5px] bg-sf-yellow-500 rounded-full" />
                  <span className="text-8 text-sf-yellow-500 font-poppins leading-12 ml-[3px]  w-30">Upcoming</span>
                </>
              ) : (
                <>
                  <span className="w-[5px] h-[5px] bg-sf-red-600 rounded-full" />
                  <span className="text-10 text-sf-red-600 font-poppins leading-16 ml-[3px]  w-30">Ended</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-6">
            <div className="flex items-center">
              <span className="text-10 leading-16 text-sf-yellow-700 font-poppins">{team?.name}</span>
              <div className="w-px h-16 bg-white/50 mx-10" />
              <span className="text-10 leading-16 text-zinc-400 font-poppins">
                {status === 'Upcoming' ? 'Starts On' : status === 'Live' ? 'Expires On' : 'Expired on'}
              </span>
              <span className="text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">
                {status === 'Upcoming' ? getDateTimeString(start) : getDateTimeString(end)}
              </span>
            </div>
            <div className="hidden sm:flex items-center mt-10 md:mt-0">
              <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
                <img src="/assets/images/decoration.svg" alt="" className="h-22" />
                <div className="flex flex-col justify-between ml-6">
                  <span className="point-name text-8 leading-8">Earn</span>
                  <span className="point-value leading-18 font-bold">{kudosReward}</span>
                </div>
              </div>
              <div className="w-px h-24 bg-white/50 mx-10" />
              <Link href={`/play/poll/${id}`}>
                <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-12 py-8">
                  {status === 'Ended' ? 'View' : 'Vote'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden justify-center items-center mt-6 mb-12">
        <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
          <img src="/assets/images/decoration.svg" alt="" className="h-22" />
          <div className="flex flex-col justify-between ml-6">
            <span className="point-name text-8 leading-8">Earn</span>
            <span className="point-value leading-18 font-bold">{kudosReward}</span>
          </div>
        </div>
        <div className="w-px h-24 bg-white/50 mx-10" />
        <Link href={`/play/poll/${id}`}>
          <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-12 py-8">
            {status === 'Ended' ? 'View' : 'Vote'}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PollDetailsCard
