import Link from 'next/link'
import { Fragment } from 'react'
import { Prediction } from '../types'

const StepsSection = ({ description, eligbleKudos, rewardKudosAll, rewardDistribution }: Prediction) => {
  return (
    <Fragment>
      <p className="text-14 text-sf-neutral-300 font-poppins leading-20">{description}</p>
      <div className="flex items-center mt-20">
        <span className="hidden sm:block text-14 text-sf-yellow-300 font-poppins leading-20 whitespace-nowrap">
          Step 1
        </span>
        <img src="/assets/images/folder-yellow.svg" alt="" className="w-20 sm:w-24 sm:ml-22" />
        <span className="text-12 text-sf-zinc-400 font-poppins leading-20 ml-18">
          To participate in the prediction, you need to hold a minimum of {eligbleKudos} kudos.
        </span>
      </div>
      <div className="flex items-center mt-20">
        <span className="hidden sm:block text-14 text-sf-yellow-300 font-poppins leading-20 whitespace-nowrap">
          Step 2
        </span>
        <img src="/assets/images/vote-yellow.svg" alt="" className="w-20 sm:w-24 sm:ml-18" />
        <span className="text-12 text-sf-zinc-400 font-poppins leading-20 ml-18">
          Click "Predict Now" button to enter and submit your choice.
        </span>
      </div>
      <div className="flex items-center mt-20">
        <span className="hidden sm:block text-14 text-sf-yellow-300 font-poppins leading-20 whitespace-nowrap">
          Step 3
        </span>
        <img src="/assets/images/crown-yellow.svg" alt="" className="w-20 sm:w-24 sm:ml-18" />
        <span className="text-12 text-sf-zinc-400 font-poppins leading-20 ml-18">
          Earn {rewardKudosAll} Kudos points just for playing.
        </span>
      </div>
      <div className="w-full h-20" />
      <Link href="/terms">
        <span className="text-14 text-sf-rose-700 font-poppins leading-20 cursor-pointer hover:underline">
          Terms and conditions
        </span>
      </Link>
    </Fragment>
  )
}

export default StepsSection
