import Progressbar from 'components/Progressbar'
import Link from 'next/link'
import { getDateTimeString, getStatusString } from 'utils'
import { ChallengeData, ChallengeTypeEnum } from 'views/Play/types'

const MyChallengeCard = ({ id, type, title, start, end }: ChallengeData) => {
  const status = getStatusString(start, end)

  return (
    <div className="w-full bg-info border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
      <div className="w-full flex items-center xs:items-start">
        <div className="min-w-60 xs:min-w-80 h-60 xs:h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
          <img
            src={`/assets/images/${
              type === ChallengeTypeEnum.Survey
                ? 'note'
                : type === ChallengeTypeEnum.CheckIn || type === ChallengeTypeEnum.MultiCheckIn
                ? 'check-in'
                : 'exchange'
            }-yellow.svg`}
            alt=""
            className="h-28 xs:h-36"
          />
        </div>
        <div className="flex flex-col xl:flex-row justify-between xl:items-center w-[calc(100%-60px)] xs:w-[calc(100%-80px)] px-6 py-16">
          <div>
            <p className="w-full text-12 xs:text-14 leading-18 text-sf-gray-300">{title}</p>
            <div className="hidden xl:flex mt-4">
              <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">
                {status === 'Live' ? 'Expires on' : 'Expired on'} :
              </span>
              <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-10">
                {getDateTimeString(end)}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center mt-10 xl:mt-0">
            <div className="flex xl:hidden mr-40">
              <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">
                {status === 'Live' ? 'Expires on' : 'Expired on'} :
              </span>
              <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-10">
                {getDateTimeString(end)}
              </span>
            </div>
            <span className="text-8 xs:text-10 text-sf-zinc-400 font-poppins mr-4 xs:mr-6 -mt-4">Progress :</span>
            <Progressbar value={100} className="!w-50 !h-50" />
            <Link
              href={`/play/challenge/${
                type === ChallengeTypeEnum.Survey
                  ? 'survey'
                  : type === ChallengeTypeEnum.CheckIn || type === ChallengeTypeEnum.MultiCheckIn
                  ? 'check-in'
                  : 'refer'
              }/${id}`}
            >
              <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-22 py-8 ml-8 xs:ml-16">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex sm:hidden justify-between items-center pb-16 px-6 xs:px-16">
        <div className="flex flex-col xs:flex-row">
          <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">
            {status === 'Live' ? 'Expires on' : 'Expired on'} :
          </span>
          <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins xs:ml-10">
            {getDateTimeString(end)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-8 xs:text-10 text-sf-zinc-400 font-poppins mr-4 xs:mr-6 -mt-4">Progress :</span>
          <Progressbar value={100} className="!w-40 !h-40" />
          <Link
            href={`/play/challenge/${
              type === ChallengeTypeEnum.Survey
                ? 'survey'
                : type === ChallengeTypeEnum.CheckIn || type === ChallengeTypeEnum.MultiCheckIn
                ? 'check-in'
                : 'refer'
            }/${id}`}
          >
            <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-22 py-8 ml-8 xs:ml-16">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MyChallengeCard
