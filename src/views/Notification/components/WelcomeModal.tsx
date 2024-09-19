import Modal, { ModalProps } from 'components/Modal'
import { useAppSelector } from 'hooks'
import Link from 'next/link'

const WelcomeModal = ({ show, onClose }: ModalProps) => {
  const { data } = useAppSelector((state) => state.user)
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <img src="/assets/images/ag-nation.png" alt="" className="w-64" />
        <p className="w-full text-22 font-poppins font-bold text-center text-golden mt-10">Welcome to AG Nation!</p>
        <p className="text-14 text-sf-gray-300 text-center font-poppins font-bold">
          Hi {data.firstName}, welcome to the AG Nation family! We are excited to level up your fan experience.
        </p>
        <div className="w-full h-26" />
        <div className="flex items-start gap-10">
          <img src="/assets/images/balls-yellow.svg" alt="" className="w-38" />
          <div className="flex flex-col">
            <p className="text-14 text-sf-gray-300 font-poppins font-bold">Play</p>
            <p className="text-14 text-sf-gray-300 font-poppins">
              Play games, complete challenges and interact with your team.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-10 mt-20">
          <img src="/assets/images/earn-yellow.svg" alt="" className="w-38" />
          <div className="flex flex-col">
            <p className="text-14 text-sf-gray-300 font-poppins font-bold">Earn</p>
            <p className="text-14 text-sf-gray-300 font-poppins">
              Earn Kudos points to up your fan rating or tokens which you can redeem for exclusive prizes, experiences
              and content..
            </p>
          </div>
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
        <Link href={'/play'}>
          <button className="w-260 h-40 bg-danger rounded-[4px] mt-10" onClick={onClose}>
            <span className="text-14 text-white uppercase">Start playing</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default WelcomeModal
