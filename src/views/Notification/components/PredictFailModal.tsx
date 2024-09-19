import Modal, { ModalProps } from 'components/Modal'

const PredictFailModal = ({ show, onClose }: ModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">The Results are in!</p>
        <div className="w-full h-20" />
        <img src="/assets/images/balls-yellow.svg" alt="" className="w-38" />
        <div className="w-full h-12" />
        <p className="text-sf-gray-300 text-center font-bold">PREDICT THE SCORE</p>
        <div className="flex justify-center items-center">
          <p className="text-10 text-sf-gray-300 font-poppins">Renegades VS Stars</p>
          <div className="w-px h-20 bg-white/50 mx-16" />
          <p className="text-10 text-sf-gray-300 font-poppins">01/01/2023</p>
        </div>
        <div className="w-full h-14" />
        <p className="text-22 font-poppins font-bold text-center text-golden">103</p>
        <div className="w-full h-10" />
        <p className="text-14 text-sf-gray-300 text-center">YOUR RANK</p>
        <p className="text-10 font-poppins text-center text-golden">OUT OF 325</p>
        <div className="w-full h-20" />
        <p className="text-14 text-sf-gray-300 text-center font-poppins">
          Unfortunately, you were not part of the winners this time around. Good luck in the next game!
        </p>
        <div className="w-full h-20" />
        <div className="flex">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Rewards sent to you by</span>
          <img src="/assets/images/power-network-logo.svg" alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
      </div>
    </Modal>
  )
}

export default PredictFailModal
