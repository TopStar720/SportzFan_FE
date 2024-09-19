import Link from 'next/link'

import Modal, { ModalProps } from 'components/Modal'

export interface CreditModalProps extends ModalProps {
  balance: number
}

const SuccessModal = ({ show, onClose, balance }: CreditModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-12 pb-36 px-30 xs:px-74">
        <div className="relative w-full h-186">
          <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/check-circle-yellow.svg" alt="" className="w-60" />
          </div>
        </div>
        <p className="w-full text-22 font-poppins font-bold text-center text-golden -mt-20">Payment Successful</p>
        <div className="w-full h-12" />
        <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex justify-center items-center">
          <img src="/assets/images/token.svg" alt="" className="h-16" />
          <span className="token-value font-bold text-24 leading-16 ml-2">{balance}</span>
        </div>
        <div className="w-full h-12" />
        <p className="text-14 text-sf-neutral-300 leading-24 font-archivo text-center">
          Tokens successfully added to your wallet
        </p>
        <div className="w-full h-20" />
        <Link href="/home">
          <button className="w-full xs:w-240 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Return Home</span>
          </button>
        </Link>
        <div className="w-full h-10" />
        <Link href="/wallet">
          <button className="w-full xs:w-240 h-40 bg-danger rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Go To Wallet</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default SuccessModal
