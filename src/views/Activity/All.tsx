import { Fragment, useEffect } from 'react'
import { ActivityType, ActivityData } from './types'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getActivities } from 'store/activities'

export const getActivityName = (type: ActivityType): string => {
  switch (type) {
    case ActivityType.EarlySignUpReward:
      return 'signup'

    case ActivityType.Prediction:
      return 'a game'

    case ActivityType.Trivia:
      return 'a game'

    case ActivityType.MilestoneReward:
      return 'a game'

    case ActivityType.CheckIn:
      return 'a challenge'

    case ActivityType.MultiCheckIn:
      return 'a challenge'

    case ActivityType.Poll:
      return 'a poll'

    case ActivityType.Asset:
      return 'a claim asset'

    case ActivityType.ProfileRewardLastName:
      return 'your profile'

    case ActivityType.ProfileRewardBirthday:
      return 'your profile'

    case ActivityType.ProfileRewardGender:
      return 'your profile'

    case ActivityType.ProfileRewardPhone:
      return 'your profile'

    case ActivityType.ProfileRewardLocationCountry:
      return 'your profile'

    case ActivityType.ProfileRewardLocationState:
      return 'your profile'

    case ActivityType.ProfileRewardLocationCity:
      return 'your profile'

    case ActivityType.ProfileRewardFavPlayer:
      return 'your profile'

    case ActivityType.ProfileRewardFantype:
      return 'your profile'

    default:
      return 'signup'
  }
}

const Activities = () => {
  const dispatch = useAppDispatch()
  const activities: ActivityData[] = useAppSelector((state) => state.activities).data

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  return (
    <Fragment>
      <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">My Activity</p>
      <div className="w-full h-20" />
      {activities.map((item) => (
        <div
          key={`activity-item-${item.id}`}
          className="w-full bg-info border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10"
        >
          <div className="flex">
            <div className="min-w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
              <img
                src={`/assets/images/${item.type === ActivityType.Asset ? 'hand' : 'user'}-medal-yellow.svg`}
                alt=""
                className="w-32"
              />
            </div>
            <div className="sm:w-[calc(100%-80px)] px-8 py-12 sm:py-20 flex flex-col justify-center">
              <p className="text-14 leading-18 text-sf-gray-300">
                You earned {Math.floor(item.tokenamount)} Tokens / {Math.floor(item.kudosamount)} Kudos for completing{' '}
                {getActivityName(item.type)}
              </p>
              <span className="text-10 leading-16 text-sf-yellow-700 font-poppins mt-6">{item.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default Activities
