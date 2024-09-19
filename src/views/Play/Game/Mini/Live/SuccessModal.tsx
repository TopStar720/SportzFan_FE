import Modal, { ModalProps } from 'components/Modal'
import { getDateString } from 'utils'
import { Mini } from '../types'

interface SuccessModalProps extends ModalProps {
  data: Mini
  rank: number
}

const SuccessModal = ({ show, onClose, data, rank }: SuccessModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <p className="text-22 font-poppins font-bold text-center text-golden">The Results are in!</p>
        <div className="w-full h-20" />
        <img src="/assets/images/balls-yellow.svg" alt="" className="h-34" />
        <div className="w-full h-10" />
        <p className="text-14 text-sf-gray-300 leading-24 text-center">{data?.title}</p>
        <div className="w-full h-4" />
        <div className="flex justify-center items-center">
          <span className="text-10 text-sf-gray-300 text-center font-poppins">{data?.match?.title}</span>
          <div className="w-px h-20 bg-white/50 mx-18" />
          <span className="text-10 text-sf-gray-300 text-center font-poppins">{getDateString(data?.start)}</span>
        </div>
        <div className="w-full h-10" />
        <p className="text-32 font-poppins font-bold text-center text-golden">{rank}</p>
        <p className="text-14 text-sf-gray-300 text-center uppercase">Your Rank</p>
        <div className="w-full h-10" />
        <p className="text-10 text-sf-yellow-500 text-center font-poppins uppercase">
          Out Of {data?.playMiniGame?.length}
        </p>
        <div className="w-full h-30" />
        <p className="text-14 text-sf-gray-300 text-center font-poppins">You Win</p>
        <div className="w-full h-10" />
        <div className="w-full flex justify-center items-center">
          <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
            <p className="point-name text-12">Kudos Points</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/decoration.svg" alt="" className="h-16" />
              <span className="point-value font-bold text-24 leading-16 ml-2">{data?.rewardKudosAll}</span>
            </div>
          </div>
          <div className="w-px h-24 bg-white/50 mx-20" />
          <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
            <p className="token-name text-12">Tokens</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/token.svg" alt="" className="h-16" />
              <span className="token-value font-bold text-24 leading-16 ml-2">{data?.rewardKudosAll}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-20" />
        <div className="flex items-center">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Sponsored By :</span>
          <img src={data?.sponsor?.logo} alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-14" />
        <button className="w-220 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
        <div className="w-full h-10" />
        <button className="w-220 h-40 bg-danger rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">View Results</span>
        </button>
      </div>
    </Modal>
  )
}

export default SuccessModal
