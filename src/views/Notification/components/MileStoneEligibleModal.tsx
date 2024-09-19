import Modal, { ModalProps } from 'components/Modal'

interface MileStoneEligibleModalProps extends ModalProps {
  detail: any
}

const MileStoneEligibleModal = ({ show, onClose, detail }: MileStoneEligibleModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-10 pb-34 px-20 sm:px-70">
        <div className="relative w-full h-186">
          <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150 -mt-20" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/like-yellow.svg" alt="" className="w-70 -mt-20" />
          </div>
        </div>
        {/* <p className="w-full text-22 font-poppins font-bold text-center text-golden -mt-40">You Win</p>
        <div className="w-full h-20" />
        <div className="flex justify-center items-center">
          <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
            <p className="point-name text-14 whitespace-nowrap">Kudos Points</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/decoration.svg" alt="" className="h-16" />
              <span className="point-value font-bold text-24 leading-16 ml-2">500</span>
            </div>
          </div>
          <div className="w-px h-40 bg-white/50 ml-10 mr-20" />
          <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
            <p className="token-name text-14">Tokens</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/token.svg" alt="" className="h-16" />
              <span className="token-value font-bold text-24 leading-16 ml-2">1000</span>
            </div>
          </div>
        </div> */}
        <div className="w-full h-24" />
        <p className="text-14 text-sf-neutral-300 font-archivo text-center">For checking in to the event</p>
        <div className="w-full h-20" />
        <img src="/assets/images/trophy-yellow.svg" alt="" className="h-40" />
        <div className="w-full h-20" />
        <p className="w-full font-poppins font-bold text-center text-golden">Milestone Unlocked!</p>
        <div className="w-full h-20" />
        <p className="text-14 text-sf-neutral-300 font-archivo text-center">You are now eligible for the Game</p>
        <p className="text-14 text-sf-neutral-300 font-archivo text-center">"{detail?.title}"</p>
        <div className="w-full h-20" />
        <div className="flex items-center">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Powered by</span>
          <img src={detail?.sponsor?.logo} alt="" className="w-100 ml-12" />
        </div>
        <div className="w-full h-30" />
        <button className="w-full sm:max-w-220 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">Done</span>
        </button>
      </div>
    </Modal>
  )
}

export default MileStoneEligibleModal
