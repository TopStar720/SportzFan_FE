import Link from 'next/link'
import { getDateString } from 'utils'
import { Asset, AssetCategory } from '../types'

interface OfferCardProps {
  data: Asset
  onRedeem: (asset: Asset) => void
}

const TeamOfferCard = ({ data, onRedeem }: OfferCardProps) => {
  const { id, title, category, totalCount, purchaseCount, end, tokenRequired } = data
  const leftCount = totalCount - purchaseCount

  return (
    <div className="w-full bg-info border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
      <div className="flex relative">
        {leftCount < 6 ? (
          <span className="hidden sm:block absolute top-10 right-10 text-10 text-sf-green-500 font-medium font-poppins">
            Only {leftCount} left
          </span>
        ) : null}
        <div className="min-w-80 h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
          <img
            src={`/assets/images/${
              category === AssetCategory.Merchandise
                ? 't-shirt'
                : category === AssetCategory.Tickets
                ? 'swipe-card'
                : category === AssetCategory.VIPPass
                ? 'vip-card'
                : category === AssetCategory.ExclusiveContent
                ? 'handshake'
                : 'ring'
            }-yellow.svg`}
            alt=""
            className="w-40"
          />
        </div>
        <div className="w-[calc(100%-80px)] px-6 py-12 sm:py-16">
          <div className="flex justify-between">
            <p className="text-12 xs:text-14 leading-18 text-sf-gray-300">{title}</p>
            {leftCount < 6 ? (
              <span className="sm:hidden text-10 text-sf-green-500 font-medium font-poppins whitespace-nowrap ml-2">
                Only {leftCount} left
              </span>
            ) : null}
          </div>
          <div className="flex flex-row justify-between mt-6 xl:mt-0">
            <div className="flex items-center">
              <div className="flex flex-col sm:flex-row">
                <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">Expires On :</span>
                <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-0 sm:ml-6">
                  {getDateString(end)}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)] mr-10 sm:m-0">
                <img src="/assets/images/token.svg" alt="" className="h-20 xs:h-24" />
                <div className="flex flex-col justify-between ml-6">
                  <span className="token-name text-8 xs:text-10">Tokens Needed</span>
                  <span className="token-value text-16 xs:text-20 leading-16 font-bold">{tokenRequired}</span>
                </div>
              </div>
              <div className="hidden sm:flex">
                <Link href={`/offer/${id}`}>
                  <button className="bg-secondary rounded-[4px] text-12 leading-14 text-white uppercase px-12 py-8 ml-10">
                    Details
                  </button>
                </Link>
                <button
                  disabled={leftCount < 1}
                  className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-12 py-8 ml-10"
                  onClick={() => onRedeem(data)}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex flex-col justify-center items-center mt-6 mb-12">
        <div className="flex">
          <Link href={`/offer/${id}`}>
            <button className="bg-secondary rounded-[4px] text-12 leading-14 text-white uppercase px-30 py-8">
              Details
            </button>
          </Link>
          <button
            disabled={leftCount < 1}
            className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-30 py-8 ml-16"
            onClick={() => onRedeem(data)}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamOfferCard
