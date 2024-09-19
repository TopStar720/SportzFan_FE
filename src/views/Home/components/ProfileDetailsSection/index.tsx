import UserLevelCard from './UserLevelCard'
import { useAppSelector } from 'hooks'
import { useEffect, useState } from 'react'
import { classNames, nFormatter } from 'utils'

export type TierData = {
  level: number
  name: string
  reach: number
}

const ProfileDetailsSection = () => {
  const { data, teamData } = useAppSelector((state) => state.user)
  const { avatar, userName, kudosAmount, tokenAmount } = data
  const {
    kudosToTire1,
    kudosToTire2,
    kudosToTire3,
    kudosToTire4,
    memberLevelName1,
    memberLevelName2,
    memberLevelName3,
    memberLevelName4,
  } = teamData
  const [tier, setTier] = useState<TierData>({
    level: 1,
    name: 'Rookie',
    reach: 0,
  })

  useEffect(() => {
    if (kudosToTire2 > 0 && kudosToTire3 > 0 && kudosToTire4) {
      if (kudosAmount >= kudosToTire1 && kudosAmount < kudosToTire2) {
        setTier({ level: 1, name: memberLevelName1, reach: kudosToTire2 })
      } else if (kudosAmount >= kudosToTire2 && kudosAmount < kudosToTire3) {
        setTier({ level: 2, name: memberLevelName2, reach: kudosToTire3 })
      } else if (kudosAmount >= kudosToTire3 && kudosAmount < kudosToTire4) {
        setTier({ level: 3, name: memberLevelName3, reach: kudosToTire4 })
      } else if (kudosAmount >= kudosToTire4) {
        setTier({ level: 4, name: memberLevelName4, reach: null })
      }
    }
  }, [
    kudosAmount,
    kudosToTire1,
    kudosToTire2,
    kudosToTire3,
    kudosToTire4,
    memberLevelName1,
    memberLevelName2,
    memberLevelName3,
    memberLevelName4,
  ])

  return (
    <div className="relative profile-details-section">
      <div className="hidden xl:block absolute z-20 left-22 top-10">
        <div className="user-avatar-wrapper w-156 h-136">
          <img
            src={avatar || '/assets/images/default-avatar.png'}
            alt="User avatar"
            className="user-avatar w-152 h-132 top-2 left-2"
          />
        </div>
      </div>
      <div className="flex justify-between items-center xl:pl-188 px-0 sm:px-28 py-8">
        <div className="flex items-center">
          <div className="xl:hidden h-52">
            <div className="user-avatar-wrapper w-60 h-52">
              <img
                src={avatar || '/assets/images/default-avatar.png'}
                alt="User avatar"
                className="user-avatar w-58 h-50 top-px left-px"
              />
            </div>
          </div>
          <div className="ml-6 sm:ml-10 xl:ml-0">
            <p className="text-12 xl:text-20 text-sf-gray-300 leading-14 xl:leading-24">{userName}</p>
            <div className="flex items-center mt-8 block xl:hidden">
              <img src={`/assets/images/tier-${tier.level}.svg`} alt="" className="h-28" />
              <span
                className={classNames(
                  'text-12 leading-12 ml-4',
                  tier.level === 1
                    ? 'text-sf-slate-300'
                    : tier.level === 2
                    ? 'text-sf-sky-300'
                    : tier.level === 3
                    ? 'text-sf-pink-400'
                    : 'text-sf-yellow-200',
                )}
              >
                {tier.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
            <img src="/assets/images/decoration.svg" alt="" className="h-20 xl:!h-40" />
            <div className="flex flex-col ml-4 lg:ml-12">
              <span className="point-name text-8 xs:text-10 xl:!text-12 leading-12 sm:leading-14 xl:leading-20">
                Kudos
              </span>
              <span className="point-value font-bold text-16 xs:text-18 xl:!text-36 leading-16 sm:leading-18 xl:leading-42">
                {nFormatter(kudosAmount, 2)}
              </span>
            </div>
          </div>
          <div className="mx-8 sm:mx-12 xl:mx-26" />
          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)]">
            <img src="/assets/images/token.svg" alt="" className="h-20 xl:!h-40" />
            <div className="flex flex-col ml-4 lg:ml-12">
              <span className="token-name text-8 xs:text-10 xl:!text-12 leading-12 sm:leading-14 xl:leading-20">
                Tokens
              </span>
              <span className="token-value font-bold text-16 xs:text-18 xl:!text-36 leading-16 sm:leading-18 xl:leading-42">
                {nFormatter(tokenAmount, 2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <UserLevelCard tier={tier} value={Math.floor(kudosAmount)} />
    </div>
  )
}

export default ProfileDetailsSection
