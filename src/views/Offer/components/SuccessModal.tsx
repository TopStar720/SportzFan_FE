import Link from 'next/link'
import Modal, { ModalProps } from 'components/Modal'
import { Asset } from 'views/Marketplace/types'

interface SuccessModalProps extends ModalProps {
  data?: Asset
}

const SuccessModal = ({ show, onClose, data }: SuccessModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-30 pb-34 px-20 sm:px-80">
        <div className="relative w-full h-186">
          <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150 -mt-20" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/like-yellow.svg" alt="" className="w-70 -mt-20" />
          </div>
        </div>
        <p className="text-14 text-sf-neutral-300 leading-24 font-archivo text-center -mt-20">
          You have successfully redeemed {data?.title}. It has been added to your My Rewards page
        </p>
        <div className="w-full h-16" />
        {!!data?.sponsor ? (
          <div className="flex items-center">
            <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Sponsored By :</span>
            <img src={data?.sponsor?.logo} alt="" className="w-100 ml-12" />
          </div>
        ) : null}
        <div className="w-full h-14" />
        <Link href="/rewards">
          <button className="w-290 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">View My Rewards</span>
          </button>
        </Link>
        <div className="w-full h-10" />
        <Link href="/marketplace">
          <button className="w-290 h-40 bg-danger rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Return to Marketplace</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default SuccessModal
