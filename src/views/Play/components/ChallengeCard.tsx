import Link from 'next/link'
import { getDateTimeString, getStatusString } from 'utils'
import { ChallengeData, ChallengeTypeEnum } from '../types'

const ChallengeCard = ({ id, type, title, start, end, isPlayed }: ChallengeData) => {
  const status = getStatusString(start, end)

  return (
    <Link
      href={`/play/challenge/${
        type === ChallengeTypeEnum.Survey
          ? 'survey'
          : type === ChallengeTypeEnum.CheckIn || type === ChallengeTypeEnum.MultiCheckIn
          ? 'check-in'
          : 'refer'
      }/${id}`}
    >
      <button className="w-full border border-sf-zinc-600 bg-dark rounded-[4px] relative">
        <div className="absolute w-full h-full flex justify-center items-center">
          <img
            src={`/assets/images/${
              type === ChallengeTypeEnum.Survey
                ? 'note'
                : type === ChallengeTypeEnum.CheckIn || type === ChallengeTypeEnum.MultiCheckIn
                ? 'check-in'
                : 'exchange'
            }.svg`}
            alt=""
            className="h-100"
          />
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
            <div className="flex items-center">
              <img src={'/assets/images/check-green.svg'} className="h-10" />
              <span className="text-10 text-sf-green-500 font-poppins leading-16 ml-[3px]">Played</span>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="flex flex-col items-center pb-20 2xl:pb-24 px-18 2xl:px-30">
          <div className="game-card-mark">
            <span className="text-12 text-white leading-14">
              {type === ChallengeTypeEnum.Survey
                ? 'Survey'
                : type === ChallengeTypeEnum.CheckIn || type === ChallengeTypeEnum.MultiCheckIn
                ? ' Check-in'
                : 'Referral Champ'}
            </span>
          </div>
          <div className="min-h-54 flex justify-center items-center my-68 sm:my-88 md:my-50 2xl:my-64">
            <p className="text-12 xl:text-14 text-sf-gray-300 leading-18 text-center">{title}</p>
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

export default ChallengeCard
