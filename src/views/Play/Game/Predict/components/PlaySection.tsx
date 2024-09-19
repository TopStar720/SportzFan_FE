import { Fragment } from 'react'
import Link from 'next/link'
import { useAppSelector } from 'hooks'
import { Prediction } from '../types'

const PlaySection = ({ id, eligbleKudos }: Prediction) => {
  const { kudosAmount } = useAppSelector((state) => state.user).data

  return (
    <Fragment>
      {kudosAmount < eligbleKudos ? (
        <div className="w-fit bg-warning flex flex-col sm:flex-row items-center px-24 py-10 rounded-[25px] mt-20">
          <div className="flex items-center">
            <img src="/assets/images/padlock-yellow.svg" alt="" className="h-20" />
            <span className="text-12 text-white font-poppins leading-20 ml-14 mr-6">
              You need {Math.floor(eligbleKudos - kudosAmount)} more kudos to play, You have to earn more kudos
            </span>
          </div>
          <div className="flex mt-10 sm:mt-0">
            <Link href="/play">
              <button className="w-[50px] h-[25px] bg-danger rounded-[5px]">
                <span className="text-10 text-white uppercase leading-12">EARN</span>
              </button>
            </Link>
          </div>
        </div>
      ) : null}
      <div className="w-full mt-20">
        <Link href={`/play/game/predict/${id}/live`}>
          <button
            className="bg-danger rounded-[4px] block m-auto sm:m-0 px-56 py-12"
            disabled={kudosAmount < eligbleKudos}
          >
            <span className="text-14 text-white uppercase leading-18">Predict Now</span>
          </button>
        </Link>
      </div>
    </Fragment>
  )
}

export default PlaySection
