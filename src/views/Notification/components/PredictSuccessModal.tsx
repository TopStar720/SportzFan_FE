import Modal, { ModalProps } from 'components/Modal'
import { useAppSelector } from 'hooks'
import { useEffect, useState } from 'react'
import { dateToDateAndTime } from 'utils'
import { GameTypeEnum } from 'views/Play/types'

interface PredictSuccessModalProps extends ModalProps {
  detail: any
}

const PredictSuccessModal = ({ show, onClose, detail }: PredictSuccessModalProps) => {
  const { data } = useAppSelector((state) => state.user)

  const [result, setResult] = useState({
    rank: 0,
    rewardToken: 0,
    rewardKudos: 0,
  })
  useEffect(() => {
    if (detail.section) {
      if (detail.section === GameTypeEnum.Predict) {
        const userResult = detail.playPrediction?.find((d) => d.userId === data.id)
        if (userResult) {
          setResult({ rank: userResult.rank, rewardKudos: userResult.rewardKudos, rewardToken: userResult.rewardToken })
        }
      }
      if (detail.section === GameTypeEnum.Trivia) {
        const userResult = detail.playTrivia?.find((d) => d.userId === data.id)
        if (userResult) {
          setResult({ rank: userResult.rank, rewardKudos: userResult.rewardKudos, rewardToken: userResult.rewardToken })
        }
      }
    }
  }, [detail])
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">The Results are in!</p>
        <div className="w-full h-20" />
        <img src="/assets/images/balls-yellow.svg" alt="" className="w-38" />
        <div className="w-full h-12" />
        <p className="text-sf-gray-300 text-center font-bold">{detail?.title}</p>
        <div className="flex justify-center items-center">
          <p className="text-10 text-sf-gray-300 font-poppins">{detail?.match?.title}</p>
          <div className="w-px h-20 bg-white/50 mx-16" />
          <p className="text-10 text-sf-gray-300 font-poppins">
            {detail?.end ? dateToDateAndTime(new Date(detail?.end)).date : ''}
          </p>
        </div>
        <div className="w-full h-14" />
        <p className="text-22 font-poppins font-bold text-center text-golden">{result?.rank}</p>
        <div className="w-full h-10" />
        <p className="text-14 text-sf-gray-300 text-center">YOUR RANK</p>
        <div className="w-full h-20" />
        <p className="text-14 text-sf-gray-300 text-center font-poppins">You Win</p>
        <div className="w-full h-14" />
        <div className="flex justify-center items-center">
          <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
            <p className="point-name text-14 whitespace-nowrap">Kudos Points</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/decoration.svg" alt="" className="h-16" />
              <span className="point-value font-bold text-24 leading-16 ml-2">{result.rewardKudos}</span>
            </div>
          </div>
          <div className="w-px h-40 bg-white/50 ml-10 mr-20" />
          <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
            <p className="token-name text-14">Tokens</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/token.svg" alt="" className="h-16" />
              <span className="token-value font-bold text-24 leading-16 ml-2">{result.rewardToken}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-20" />
        <div className="flex items-center">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Rewards sent to you by</span>
          <img src={detail?.sponsor?.logo} alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
      </div>
    </Modal>
  )
}

export default PredictSuccessModal
