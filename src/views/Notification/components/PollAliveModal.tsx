import Modal, { ModalProps } from 'components/Modal'
import Link from 'next/link'

interface PollAliveModalProps extends ModalProps {
  detail: any
}

const PollAliveModal = ({ show, onClose, detail }: PollAliveModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">It's Time to Vote!</p>
        <div className="w-full h-20" />
        <img src="/assets/images/chart-yellow.svg" alt="" className="w-38" />
        <div className="w-full h-12" />
        <div className="flex flex-col items-center">
          <p className="text-sf-gray-300 text-center font-bold">{detail?.title}</p>
          <div className="flex justify-center items-center">
            <p className="text-10 text-sf-gray-300 font-poppins">{detail?.match?.title}</p>
          </div>
          <p className="text-golden text-center font-bold mt-20">IS NOW LIVE</p>
        </div>
        <div className="w-full h-20" />
        <div className="flex flex-col items-center">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Powered by</span>
          <img src={detail?.sponsor?.logo} alt="" className="w-100" />
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
        <Link href={`/play/poll/${detail.id}`}>
          <button className="w-260 h-40 bg-danger rounded-[4px] mt-10" onClick={onClose}>
            <span className="text-14 text-white uppercase">vote now</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default PollAliveModal
