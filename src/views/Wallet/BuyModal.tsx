import { useState } from 'react'
import Link from 'next/link'

import Modal, { ModalProps } from 'components/Modal'

export interface BuyModalProps extends ModalProps {
  price: number
}

const BuyModal = ({ show, onClose, price }: BuyModalProps) => {
  const [value, setValue] = useState<string>('')

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-30 pb-34 px-20 sm:px-50">
        <div className="relative w-full h-140">
          <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150 -mt-20" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/token-with-ambient-effect.png" alt="" className="w-112 mt-20" />
          </div>
        </div>
        <div className="w-full h-10" />
        <p className="text-12 leading-20 text-sf-neutral-300 font-archivo text-center">
          To add the token to your wallet, Please enter the amount and click on the Pay Now button
        </p>
        <div className="w-full h-20" />
        <div className="flex items-center border border-zinc-600 rounded-[4px] pl-16 pr-6 py-14">
          <span className="text-14 leading-20 text-sf-gray-300 font-poppins">A$</span>
          <input
            type="number"
            className="w-full h-full bg-transparent text-14 leading-20 text-sf-gray-300 font-poppins ml-6"
            onChange={(e) => setValue(e.target.value)}
          />
          <span className="text-14 leading-20 text-sf-gray-300 font-poppins whitespace-nowrap ml-4">
            = {parseFloat(value) / price || 0} AGIA tokens
          </span>
        </div>
        <div className="w-full h-10" />
        <p className="text-14 leading-20 text-sf-yellow-700 font-poppins text-center">1 AG1A token = A$ {price}</p>
        <div className="w-full h-20" />
        <div className="flex justify-center">
          <button className="w-140 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Cancel</span>
          </button>
          <Link href={`/payment?amount=${value}`}>
            <button className="w-140 h-40 bg-danger rounded-[4px] ml-10" disabled={!value} onClick={onClose}>
              <span className="text-14 text-white uppercase">Pay Now</span>
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default BuyModal
