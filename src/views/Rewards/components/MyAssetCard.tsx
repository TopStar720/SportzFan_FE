import { getDateTimeString } from 'utils'
import { AssetCategory, MyAsset } from 'views/Marketplace/types'

interface MyAssetCardProps {
  data: MyAsset
  onShowClaimModal: (data: MyAsset) => void
}

const MyAssetCard = ({ data, onShowClaimModal }: MyAssetCardProps) => {
  const { category, title, end } = data?.asset

  return (
    <div className="w-full bg-info border border-sf-zinc-600 rounded-[4px] text-left mb-10 px-10">
      <div className="w-full flex items-center">
        <div className="min-w-60 xs:min-w-80 h-60 xs:h-80 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
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
        <div className="flex flex-col xl:flex-row justify-between xl:items-center w-[calc(100%-60px)] xs:w-[calc(100%-80px)] px-6 py-16">
          <div>
            <p className="w-full text-12 xs:text-14 leading-18 text-sf-gray-300">{title}</p>
            <div className="hidden xl:flex mt-4">
              <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">Expires On :</span>
              <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-10">
                {getDateTimeString(end)}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center mt-10 xl:mt-0">
            <div className="flex xl:hidden mr-40">
              <span className="text-8 xs:text-10 leading-16 text-zinc-400 font-poppins">Expires On :</span>
              <span className="text-8 xs:text-10 leading-16 text-sf-yellow-700 font-poppins ml-10">
                {getDateTimeString(end)}
              </span>
            </div>
            <button
              className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-22 py-8 ml-16"
              onClick={() => onShowClaimModal(data)}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex sm:hidden justify-between items-center pb-16 px-6 xs:px-16">
        <div className="flex flex-col xs:flex-row">
          <span className="text-10 leading-16 text-zinc-400 font-poppins">Expires On :</span>
          <span className="text-10 leading-16 text-sf-yellow-700 font-poppins xs:ml-10">{getDateTimeString(end)}</span>
        </div>
        <button
          className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-22 py-8 ml-16"
          onClick={() => onShowClaimModal(data)}
        >
          View
        </button>
      </div>
    </div>
  )
}

export default MyAssetCard
