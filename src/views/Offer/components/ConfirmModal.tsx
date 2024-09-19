import Modal, { ModalProps } from 'components/Modal'

interface ConfirmModalProps extends ModalProps {
  need?: number
  onConfirm: () => void
}

const ConfirmModal = ({ show, onClose, need, onConfirm }: ConfirmModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-20 pb-30 px-20 sm:px-70">
        <div className="relative w-full h-186">
          <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150 -mt-10" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/hand-medal-yellow.svg" alt="" className="w-90" />
          </div>
        </div>
        <p className="w-full text-16 text-sf-gray-300 text-center -mt-20">Redeem</p>
        <p className="w-full text-14 text-sf-neutral-300 font-archivo text-center">Are you sure you want to redeem?</p>
        <div className="w-full h-6" />
        <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)]">
          <img src="/assets/images/token.svg" alt="" className="h-24" />
          <span className="token-value text-24 font-bold ml-4">{need}</span>
          <span className="token-name text-11 ml-4">tokens</span>
        </div>
        <div className="w-full h-30" />
        <div className="flex justify-center">
          <button className="w-140 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">No</span>
          </button>
          <button className="w-140 h-40 bg-danger rounded-[4px] ml-14" onClick={onConfirm}>
            <span className="text-14 text-white uppercase">Yes</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
