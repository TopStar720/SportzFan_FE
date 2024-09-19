import { Poll } from '../types'
import { getDateString, getStatusString } from 'utils'

const DetailsSection = ({ title, start, end, sponsor, kudosEligible, kudosReward, isEnded }: Poll) => {
  const status = isEnded ? 'Ended' : getStatusString(start, end)

  return (
    <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden">
      <img src="/assets/images/bg-with-spiral-curves.png" alt="" className="absolute inset-0 w-full h-full" />
      <div className="absolute w-full h-full flex justify-center items-center xl:justify-end">
        <img src="/assets/images/chart-yellow-light.svg" alt="" className="h-120 xl:mr-50" />
      </div>
      <div className="relative flex flex-col items-center xl:items-start text-center xl:text-left px-20 sm:px-30 py-24 xl:pt-30">
        <p className="text-20 sm:text-24 text-sf-gray-300 font-bold">{title}</p>
        <div className="flex items-center mb-6 xl:mb-0 mt-14">
          <div className="h-full hidden sm:flex flex-col justify-between">
            <p className="text-10 text-sf-zinc-400 font-poppins">
              {status === 'Upcoming' ? 'Starts On' : status === 'Live' ? 'Expires On' : 'Expired on'}
            </p>
            <p className="text-20 text-sf-gray-300 leading-30">
              {status === 'Upcoming' ? getDateString(start) : getDateString(end)}
            </p>
          </div>
          <div className="w-px h-24 xl:h-40 bg-white/50 mx-10 sm:mx-22" />
          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
            <img src="/assets/images/decoration.svg" alt="" className="h-28" />
            <div className="flex flex-col justify-between ml-8 md:ml-12">
              <span className="point-name text-10 xl:text-12">Earn</span>
              <span className="point-value font-bold md:text-24 xl:text-28 leading-30">{kudosReward}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center xl:block">
          <span className="text-10 text-sf-zinc-400">Sponsored By</span>
          <img src={sponsor?.logo} alt="" className="h-60 ml-10 xl:ml-0 md:mt-4" />
          <div className="sm:hidden h-full flex flex-col justify-between ml-20">
            <p className="text-10 text-sf-zinc-400 font-poppins">
              {status === 'Upcoming' ? 'Starts On' : status === 'Live' ? 'Expires On' : 'Expired on'}
            </p>
            <p className="text-sf-gray-300 leading-20">
              {status === 'Upcoming' ? getDateString(start) : getDateString(end)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsSection
