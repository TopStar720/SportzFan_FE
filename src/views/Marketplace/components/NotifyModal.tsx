import Link from 'next/link'
import Modal, { ModalProps } from 'components/Modal'
import { NotifyType } from '../types'

interface NotifyModalProps extends ModalProps {
  notifyType: NotifyType
  need: number
}

const NotifyModal = ({ show, onClose, notifyType, need }: NotifyModalProps) => {
  const needType = notifyType === NotifyType.token ? 'tokens' : 'kudos'

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-warning rounded-[15px] flex flex-col items-center py-26 px-20 sm:px-40 text-center">
        <img src="/assets/images/padlock-yellow.svg" alt="" className="h-42" />
        <div className="w-full h-12" />
        <p className="text-white font-poppins leading-24">
          You need {need} more {needType} to redeem.
        </p>
        <p className="text-white font-poppins leading-24">You have to earn more {needType}</p>
        <div className="w-full h-18" />
        <div className="flex justify-center">
          <Link href="/play">
            <button className="w-120 h-40 bg-danger rounded-[4px]" onClick={onClose}>
              <span className="text-14 text-white uppercase">EARN</span>
            </button>
          </Link>
          <button className="w-120 h-40 bg-secondary rounded-[4px] ml-10" onClick={onClose}>
            <span className="text-14 text-white uppercase">Back</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NotifyModal
