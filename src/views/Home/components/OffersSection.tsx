import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Slider from './Slider'
import { useAppSelector } from 'hooks'
import { getDateTimeString } from 'utils'
import { Asset } from 'views/Marketplace/types'

const OffersSection = () => {
  const assets = useAppSelector((state) => state.assets).assets.data

  const [latestOffers, setLatestOffers] = useState<Asset[]>([])

  useEffect(() => {
    if (assets.length > 3) {
      setLatestOffers(assets.slice(0, 3))
    } else {
      setLatestOffers(assets)
    }
  }, [assets])

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Latest Offers</p>
        <Link href="/offer/all">
          <button className="flex items-center pt-4">
            <span className="text-12 sm:text-14 text-sf-rose-700 leading-18 whitespace-nowrap">SEE All</span>
            <img src="/assets/images/forward.svg" alt="" className="h-12 sm:h-16 ml-4 sm:ml-8" />
          </button>
        </Link>
      </div>
      <div className="hidden md:grid grid-cols-3 gap-12 2xl:gap-18 my-20">
        {latestOffers.map((item) => (
          <Link key={`latest-offer-item-${item.id}`} href={`/offer/${item.id}`}>
            <button className="relative w-full bg-info border border-sf-zinc-600 rounded-[4px] px-30 md:px-18 2xl:px-30 py-20 sm:py-30 md:py-20 2xl:py-30">
              <div className="relative">
                <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[40%] m-auto" />
                <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                  <img src={item.imageUrl} alt="" className="!w-[20%]" />
                </div>
              </div>
              <p className="min-h-54 text-14 text-sf-gray-300 leading-18 text-center mt-16 sm:mt-34 md:-mt-10 2xl:mt-10">
                {item.title}
              </p>
              <p className="text-10 text-sf-yellow-700 leading-16 text-center mt-8">{getDateTimeString(item.start)}</p>
            </button>
          </Link>
        ))}
      </div>
      <div className="block md:hidden w-full">
        <Slider>
          {latestOffers.map((item) => (
            <div key={`latest-offer-mobile-item-${item.id}`} className="px-10 pt-20 pb-40">
              <Link href={`/offer/${item.id}`}>
                <button className="relative w-full bg-info border border-sf-zinc-600 rounded-[4px] px-30 md:px-18 2xl:px-30 py-20 sm:py-30 md:py-20 2xl:py-30">
                  <div className="relative">
                    <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[40%] m-auto" />
                    <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                      <img src={item.imageUrl} alt="" className="!w-[20%]" />
                    </div>
                  </div>
                  <p className="min-h-54 text-14 text-sf-gray-300 leading-18 text-center mt-16 sm:mt-34 md:-mt-10 2xl:mt-10">
                    {item.title}
                  </p>
                  <p className="text-10 text-sf-yellow-700 leading-16 text-center mt-8">
                    {getDateTimeString(item.start)}
                  </p>
                </button>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default OffersSection
