import Link from 'next/link'
import Modal, { ModalProps } from 'components/Modal'
import { CheckInTypeEnum } from '../types'

interface ConfirmModalProps extends ModalProps {
  type: CheckInTypeEnum
  data: any
  onConfirm: () => void
}

const ConfirmModal = ({ show, onClose, type, data, onConfirm }: ConfirmModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-46 px-20 sm:px-70">
        <img src="/assets/images/map-pin-yellow.svg" alt="" className="h-64" />
        <div className="w-full h-36" />
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">
          {type === CheckInTypeEnum.Inside ? 'Inside the stadium' : 'Outside the stadium'}
        </p>
        <div className="w-full h-20" />
        <p className="text-14 text-white leading-24 font-archivo text-center">
          {type === CheckInTypeEnum.Inside ? 'Confirm In Venue Check-In' : 'You currently are outside of the stadium.'}
        </p>
        <p className="text-14 text-white leading-24 font-archivo text-center">
          {type === CheckInTypeEnum.Inside ? <br /> : 'Get within range to check-in at-stadium.'}
        </p>
        <div className="w-full h-20" />
        <div className="flex flex-col justify-center items-center">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Sponsored By :</span>
          <img src={data?.sponsor?.logo} alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">Back</span>
        </button>
        <div className="w-full h-10" />
        <button className="w-260 h-40 bg-danger rounded-[4px]" onClick={onConfirm}>
          <span className="text-14 text-white uppercase">
            {type === CheckInTypeEnum.Inside ? 'Continue to check-in' : 'Continue outside check-in'}
          </span>
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
