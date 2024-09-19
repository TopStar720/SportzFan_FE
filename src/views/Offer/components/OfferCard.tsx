import Link from 'next/link'
import { getDateString } from 'utils'
import { Asset, AssetCategory } from 'views/Marketplace/types'

const OfferCard = ({ id, category, title, end }: Asset) => {
  return (
    <>
      <div className="hidden md:block w-full bg-info border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
        <div className="flex">
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
          <div className="sm:w-[calc(100%-80px)] px-8 py-12 sm:py-20 flex justify-between items-center">
            <div>
              <p className="text-14 leading-18 text-sf-gray-300">{title}</p>
              <span className="text-10 leading-16 text-sf-yellow-700 font-poppins mt-6">{`Expires On ${getDateString(
                end,
              )}`}</span>
            </div>
            <Link href={`/offer/${id}`}>
              <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-22 py-8">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Link href={`/offer/${id}`}>
        <button className="md:hidden w-full bg-info border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
          <div className="flex">
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
            <div className="sm:w-[calc(100%-80px)] px-8 py-12 sm:py-20 flex justify-between items-center">
              <div>
                <p className="text-14 leading-18 text-sf-gray-300">{title}</p>
                <span className="text-10 leading-16 text-sf-yellow-700 font-poppins mt-6">{`Expires On ${getDateString(
                  end,
                )}`}</span>
              </div>
            </div>
          </div>
        </button>
      </Link>
    </>
  )
}

export default OfferCard
