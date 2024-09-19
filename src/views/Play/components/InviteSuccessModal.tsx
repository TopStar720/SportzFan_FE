import Link from 'next/link'
import Modal, { ModalProps } from 'components/Modal'

interface InviteSuccessModalProps extends ModalProps {
  type: string
}

const InviteSuccessModal = ({ show, onClose, type }: InviteSuccessModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-46 px-20 sm:px-52">
        <img src="/assets/images/send-yellow.svg" alt="" className="h-64" />
        <div className="w-full h-36" />
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">Invited Friends</p>
        <div className="w-full h-20" />
        <p className="text-14 text-white leading-24 font-archivo text-center">
          Your invitation has been sent successfully.
        </p>
        <div className="w-full h-20" />
        <div className="flex">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Sponsored By :</span>
          <img src="/assets/images/power-network-logo.svg" alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-14" />
        <button className="w-240 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">Ok</span>
        </button>
        <div className="w-full h-10" />
        <Link href={`/play/${type}/all`}>
          <button className="w-240 h-40 bg-danger rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Play another {type}</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default InviteSuccessModal
