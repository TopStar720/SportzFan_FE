import Modal, { ModalProps } from 'components/Modal'
import { useAppSelector } from 'hooks'
import Link from 'next/link'

interface RewardModalProps extends ModalProps {
  detail: any
}

const RewardModal = ({ show, onClose, detail }: RewardModalProps) => {
  const { teamData } = useAppSelector((state) => state.user)

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">You Won A Bonus Reward!</p>
        <div className="w-full h-20" />
        <img src="/assets/images/t-shirt-yellow.svg" alt="" className="w-38" />
        <div className="w-full h-12" />
        <p className="text-sf-gray-300 text-center font-bold">{detail?.title}</p>
        <div className="w-full h-8" />
        <p className="text-14 text-sf-gray-300 text-center font-poppins">{detail?.description}</p>
        <div className="w-full h-26" />
        <p className="text-14 font-poppins font-bold text-center text-golden">Why did I win this?</p>
        <div className="w-full h-14" />
        <p className="text-10 text-sf-gray-300 font-poppins text-center">{detail?.detailContent}</p>
        <div className="w-full h-34" />
        <div className="flex items-center">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Rewards sent to you by</span>
          <img src={teamData.logo} alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
        <Link href={`/rewards/assets`}>
          <button className="w-260 h-40 bg-danger rounded-[4px] mt-10" onClick={onClose}>
            <span className="text-14 text-white uppercase">View Item</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default RewardModal
