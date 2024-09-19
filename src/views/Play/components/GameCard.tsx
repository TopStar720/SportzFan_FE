import Link from 'next/link'
import { getDateTimeString, getStatusString } from 'utils'
import { GameData, GameTypeEnum } from '../types'

const GameCard = ({
  id,
  type,
  title,
  start,
  end,
  team_logo,
  match_home_team_logo,
  match_away_team_logo,
  is_ended,
  isPlayed,
}: GameData) => {
  const status = is_ended ? 'Ended' : getStatusString(start, end)

  return (
    <Link
      href={`/play/game/${
        type === GameTypeEnum.Predict
          ? 'predict'
          : type === GameTypeEnum.Trivia
          ? 'trivia'
          : type === GameTypeEnum.Milestone
          ? 'milestone'
          : 'mini'
      }/${id}`}
    >
      <button className="w-full border border-sf-zinc-600 bg-dark rounded-[4px] relative">
        <div className="absolute top-34 w-full">
          <img
            src={`/assets/images/${
              type === GameTypeEnum.Predict
                ? 'lamp'
                : type === GameTypeEnum.Trivia
                ? 'chat'
                : type === GameTypeEnum.Milestone
                ? 'trophy'
                : 'gamepad'
            }.svg`}
            alt=""
            className="h-74 m-auto"
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
              {type === GameTypeEnum.Predict
                ? 'Predict'
                : type === GameTypeEnum.Trivia
                ? 'Trivia'
                : type === GameTypeEnum.Milestone
                ? 'Milestone'
                : 'Mini Game'}
            </span>
          </div>
          {type === GameTypeEnum.Trivia ? (
            <div className="w-full flex justify-center card-image-section my-46 sm:my-66 md:my-32 2xl:my-40">
              <img src={team_logo} alt="" className="h-46 md:h-36 2xl:h-46" />
            </div>
          ) : (
            <div className="w-full flex justify-around items-center card-image-section my-46 sm:my-66 md:my-32 2xl:my-40">
              <img src={match_home_team_logo} alt="" className="h-40 md:h-30 2xl:h-40" />
              <img src="/assets/images/vs-yellow.svg" alt="" className="h-46 md:h-36 2xl:h-46" />
              <img src={match_away_team_logo} alt="" className="h-46 md:h-36 2xl:h-46" />
            </div>
          )}
          <p className="min-h-54 text-12 xl:text-14 text-sf-gray-300 leading-18 text-center">{title}</p>
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

export default GameCard
