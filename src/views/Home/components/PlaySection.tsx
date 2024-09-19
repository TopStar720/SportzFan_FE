import Link from 'next/link'
import { Fragment } from 'react'
import Slider from './Slider'

const PlaySection = () => {
  return (
    <Fragment>
      <p className="text-24 text-sf-gray-300 leading-30 font-bold">Play</p>
      <div className="hidden md:grid grid-cols-3 gap-12 2xl:gap-18 my-20">
        <Link href="/play/game/all">
          <button className="relative w-full bg-sf-zinc-900 border border-sf-zinc-600 rounded-[4px] py-20 2xl:py-24">
            <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine.svg')] bg-cover bg-center" />
            <div className="relative">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[56%] m-auto" />
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                <img src="/assets/images/balls-yellow.svg" alt="" className="!w-[32%]" />
              </div>
            </div>
            <p className="text-20 text-sf-gray-300 leading-24 mt-10">Games</p>
          </button>
        </Link>
        <Link href="/play/poll/all">
          <button className="relative w-full bg-sf-zinc-900 border border-sf-zinc-600 rounded-[4px] py-20 2xl:py-24">
            <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine.svg')] bg-cover bg-center" />
            <div className="relative">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[56%] m-auto" />
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                <img src="/assets/images/chart-yellow.svg" alt="" className="!w-[32%]" />
              </div>
            </div>
            <p className="text-20 text-sf-gray-300 leading-24 mt-10">Polls</p>
          </button>
        </Link>
        <Link href="/play/challenge/all">
          <button className="relative w-full bg-sf-zinc-900 border border-sf-zinc-600 rounded-[4px] py-20 2xl:py-24">
            <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine.svg')] bg-cover bg-center" />
            <div className="relative">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[56%] m-auto" />
              <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                <img src="/assets/images/handshake-yellow.svg" alt="" className="!w-[32%]" />
              </div>
            </div>
            <p className="text-20 text-sf-gray-300 leading-24 mt-10">Challenges</p>
          </button>
        </Link>
      </div>
      <div className="block md:hidden w-full">
        <Slider>
          <div className="px-10 pt-20 pb-40">
            <Link href="/play/game/all">
              <button className="relative w-full bg-sf-zinc-900 border border-sf-zinc-600 rounded-[4px] py-20 2xl:py-24">
                <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine.svg')] bg-cover bg-center" />
                <div className="relative">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[56%] m-auto" />
                  <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                    <img src="/assets/images/balls-yellow.svg" alt="" className="!w-[32%]" />
                  </div>
                </div>
                <p className="text-20 text-sf-gray-300 leading-24 mt-10">Games</p>
              </button>
            </Link>
          </div>
          <div className="px-10 pt-20 pb-40">
            <Link href="/play/poll/all">
              <button className="relative w-full bg-sf-zinc-900 border border-sf-zinc-600 rounded-[4px] py-20 2xl:py-24">
                <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine.svg')] bg-cover bg-center" />
                <div className="relative">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[56%] m-auto" />
                  <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                    <img src="/assets/images/chart-yellow.svg" alt="" className="!w-[32%]" />
                  </div>
                </div>
                <p className="text-20 text-sf-gray-300 leading-24 mt-10">Polls</p>
              </button>
            </Link>
          </div>
          <div className="px-10 pt-20 pb-40">
            <Link href="/play/challenge/all">
              <button className="relative w-full bg-sf-zinc-900 border border-sf-zinc-600 rounded-[4px] py-20 2xl:py-24">
                <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine.svg')] bg-cover bg-center" />
                <div className="relative">
                  <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen !w-[56%] m-auto" />
                  <div className="absolute inset-0 w-full h-full flex justify-center items-center">
                    <img src="/assets/images/handshake-yellow.svg" alt="" className="!w-[32%]" />
                  </div>
                </div>
                <p className="text-20 text-sf-gray-300 leading-24 mt-10">Challenges</p>
              </button>
            </Link>
          </div>
        </Slider>
      </div>
    </Fragment>
  )
}

export default PlaySection
