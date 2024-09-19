import { getDateString } from 'utils'
import { AssetCategory, MyAsset } from '../types'

const HistoryOfferCard = ({ createdAt, asset }: MyAsset) => {
  const { title, category, end, tokenRequired } = asset

  return (
    <div className="w-full bg-dark border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
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
        <div className="sm:w-[calc(100%-80px)] sm:flex justify-between items-center px-6 py-12 sm:py-16">
          <div>
            <p className="text-12 xs:text-14 leading-18 text-sf-gray-300">{title}</p>
            <div className="flex flex-col sm:flex-row justify-between mt-6">
              <div className="flex items-center">
                <div className="flex flex-col sm:flex-row">
                  <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">Expires On :</span>
                  <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-0 sm:ml-6">
                    {getDateString(end)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-row-reverse justify-end sm:flex-col sm:items-end mt-6 sm:mt-0">
            <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)] ml-12 sm:ml-0">
              <img src="/assets/images/token.svg" alt="" className="h-12 xs:h-16" />
              <span className="token-value text-16 xs:text-20 leading-16 font-bold ml-10">{tokenRequired}</span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">Transaction Date :</span>
              <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">
                {getDateString(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex justify-center items-center mb-16">
        <div className="flex items-center">
          <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">Transaction Date :</span>
          <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">
            {getDateString(createdAt)}
          </span>
        </div>
        <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)] ml-12">
          <img src="/assets/images/token.svg" alt="" className="h-12 xs:h-16" />
          <span className="token-value text-16 xs:text-20 leading-16 font-bold ml-10">{tokenRequired}</span>
        </div>
      </div>
    </div>
  )
}

export default HistoryOfferCard
