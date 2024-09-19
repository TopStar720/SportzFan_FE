import { Fragment } from 'react'

interface Props {
  onBack: () => void
}

const Crypto = ({ onBack }: Props) => {
  return (
    <Fragment>
      <div className="w-full flex flex-col items-center bg-info border border-sf-zinc-600 rounded-[4px] px-20 xs:px-46 pt-20 xs:pt-36 pb-50 xs:pb-80">
        <div className="w-128 h-128 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
          <img src="/assets/images/pocket-yellow.svg" alt="" className="h-56 xs:h-68" />
        </div>
        <p className="text-14 text-sf-neutral-300 font-archivo">Crypto Payment Not Available.</p>
        <p className="text-14 text-sf-neutral-300 font-archivo">Still to come.</p>
      </div>
      <div className="w-full h-30 xs:h-42" />
      <button
        className="w-full xs:w-180 bg-danger rounded-[4px] py-10 block m-auto text-14 text-white uppercase"
        onClick={() => onBack()}
      >
        GO BACK
      </button>
    </Fragment>
  )
}

export default Crypto
