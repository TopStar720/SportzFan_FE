import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { Mini } from '../types'

const StepsSection = ({ description, eligbleKudos, lifeCount, refreshTime, refreshAmount }: Mini) => {
  return (
    <Fragment>
      <p className="text-14 text-sf-neutral-300 font-poppins leading-20">{description}</p>
      <div className="flex items-center mt-20">
        <span className="hidden sm:block text-14 text-sf-yellow-300 font-poppins leading-20 whitespace-nowrap">
          Step 1
        </span>
        <img src="/assets/images/folder-yellow.svg" alt="" className="w-20 sm:w-24 sm:ml-22" />
        <span className="text-12 text-sf-zinc-400 font-poppins leading-20 ml-18">
          To participate in the Mini Game, you need to hold a minimum of {eligbleKudos} Kudos.
        </span>
      </div>
      <div className="flex items-center mt-20">
        <span className="hidden sm:block text-14 text-sf-yellow-300 font-poppins leading-20 whitespace-nowrap">
          Step 2
        </span>
        <img src="/assets/images/gamepad-yellow.svg" alt="" className="w-24 sm:w-32 sm:ml-14" />
        <span className="text-12 text-sf-zinc-400 font-poppins leading-20 ml-14">
          Click "Let's Play" button below to get started.
        </span>
      </div>
      <div className="flex items-center mt-20">
        <span className="hidden sm:block text-14 text-sf-yellow-300 font-poppins leading-20 whitespace-nowrap">
          Step 3
        </span>
        <img src="/assets/images/crown-yellow.svg" alt="" className="w-20 sm:w-24 sm:ml-18" />
        <span className="text-12 text-sf-zinc-400 font-poppins leading-20 ml-18">
          Earn Kudos each time you play. Top scores at the end of the month will receive bonus rewards and prizes.
        </span>
      </div>
      <div className="w-full h-24" />
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center text-sf-yellow-700">
              <span className="mr-6">Game Rules</span>
              <img src={`/assets/images/forward-${open ? 'up' : 'down'}.svg`} alt="" className="h-16" />
            </Disclosure.Button>
            <Disclosure.Panel className="text-12 text-sf-zinc-400 font-poppins pt-10">
              <div className="flex items-center">
                <span className="font-bold mr-4">Number of plays to start:</span>
                <span>{lifeCount}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-4">Time until next play:</span>
                <span>{refreshTime} mins</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-4">Number of plays per refresh:</span>
                <span>{refreshAmount}</span>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="w-full h-10" />
      <Link href="/terms">
        <span className="text-14 text-sf-rose-700 font-poppins leading-20 cursor-pointer hover:underline">
          Terms and conditions
        </span>
      </Link>
    </Fragment>
  )
}

export default StepsSection
