import { Fragment } from 'react'
import { getDateString } from 'utils'
import { Poll } from '../types'

const InfoSection = ({ title, description, end, kudosReward, tokenReward }: Poll) => {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-24 text-sf-gray-300 font-bold leading-16">{title}</p>
          <div className="flex mt-8">
            <span className="text-12 text-sf-zinc-400 font-poppins leading-10">Expires On :</span>
            <span className="text-12 text-sf-yellow-700 leading-12 ml-2">{getDateString(end)}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
            <img src="/assets/images/decoration.svg" alt="" className="h-28" />
            <div className="flex flex-col justify-between ml-8 md:ml-12">
              <span className="point-name text-10 xl:text-12">Earn</span>
              <span className="point-value font-bold md:text-24 xl:text-28 leading-30">{kudosReward}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-14 text-sf-neutral-300 font-poppins leading-20 mt-20">{description}</p>
    </Fragment>
  )
}

export default InfoSection
