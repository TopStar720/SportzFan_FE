import { classNames } from 'utils'
import { TierData } from '.'

interface UserLevelProps {
  tier: TierData
  value: number
}

const UserLevelCard = ({ tier, value }: UserLevelProps) => {
  return (
    <div
      className={classNames(
        "user-level-card bg-[url('/assets/images/bg-mobile-user-level-card.png')] sm:bg-[url('/assets/images/bg-user-level-card.png')] bg-contain xs:bg-cover bg-no-repeat xs:pt-12 xs:pb-16 md:!pt-12 md:!pb-20 2xl:!pt-24 2xl:!pb-36",
        !tier.reach ? 'hidden xl:block' : '',
      )}
    >
      <div className="flex items-center pl-30 sm:pl-60 xl:pl-188 pr-30 sm:pr-60 2xl:pr-70 md:py-6 lg:py-2 xl:py-0">
        <img src={`/assets/images/tier-${tier.level}.svg`} alt="" className="h-60 hidden xl:block" />
        <div className="w-full xl:pl-10">
          <span
            className={classNames(
              'text-18 leading-22 hidden xl:block',
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
          <div
            className={classNames(
              'w-full flex flex-col sm:flex-row items-center sm:items-end',
              !tier.reach ? 'hidden' : '',
            )}
          >
            <div className="w-full">
              <div className="flex justify-between items-center">
                <span
                  className={classNames(
                    'text-12 sm:text-14 leading-20',
                    tier.level === 1 ? 'text-sf-sky-300' : tier.level === 2 ? 'text-sf-pink-400' : 'text-sf-yellow-200',
                  )}
                >
                  {tier.reach === 0 ? 0 : Math.round((value / tier.reach) * 100)}%
                </span>
                <div className="flex items-center">
                  <img src="/assets/images/decoration.svg" alt="" className="h-12" />
                  <span className="text-12 sm:text-16 point-value leading-20 ml-4">{`${value}/${tier.reach}`}</span>
                </div>
              </div>
              <div className="relative w-full h-6 sm:h-10 mt-4">
                <div className="absolute w-full h-full bg-sf-gray-600 rounded-full" />
                <div
                  className={classNames(
                    'h-full rounded-full relative',
                    tier.level === 1 ? 'bg-sf-sky-300' : tier.level === 2 ? 'bg-sf-pink-400' : 'bg-sf-yellow-200',
                  )}
                  style={{ width: `${tier.reach === 0 ? 0 : Math.round((value / tier.reach) * 100)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center ml-6 mt-4 sm:mt-0">
              <span
                className={classNames(
                  'text-12 sm:text-14 leading-20 whitespace-nowrap mr-6',
                  tier.level === 1 ? 'text-sf-sky-300' : tier.level === 2 ? 'text-sf-pink-400' : 'text-sf-yellow-200',
                )}
              >
                Next Level
              </span>
              <img src={`/assets/images/tier-${tier.level + 1}.svg`} alt="" className="h-16 sm:h-22" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLevelCard
