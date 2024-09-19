import Modal, { ModalProps } from 'components/Modal'
import { useEffect, useState } from 'react'
import { NotificationCategoryType } from '../types'

interface TransferSuccessModalProps extends ModalProps {
  detail: any
}

const TransferSuccessModal = ({ show, onClose, detail }: TransferSuccessModalProps) => {
  const [kudos, setKudos] = useState(0)
  const [token, setToken] = useState(0)

  useEffect(() => {
    setToken(Number(detail?.content?.split(',')[0]) || 0)
    setKudos(Number(detail?.content?.split(',')[1]) || 0)
  }, [detail])

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        {detail.category === NotificationCategoryType.TransferReceived && detail.section === 'admin' && (
          <p className="w-full text-22 font-poppins font-bold text-center text-golden mt-10">You Won Bonus Rewards!</p>
        )}
        {detail.category === NotificationCategoryType.TransferSent && (
          <p className="w-full text-22 font-poppins font-bold text-center text-golden mt-10">You Sent Kudos, Tokens!</p>
        )}

        <div className="w-100 h-100 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover my-8">
          <img src="/assets/images/hand-coin-yellow.svg" alt="" className="w-42" />
        </div>
        <div className="w-full h-20" />
        {kudos > 0 && token > 0 ? (
          <div className="flex justify-center items-center">
            <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
              <p className="point-name text-14 whitespace-nowrap">Kudos Points</p>
              <div className="flex items-center mt-10">
                <img src="/assets/images/decoration.svg" alt="" className="h-16" />
                <span className="point-value font-bold text-24 leading-16 ml-2">{kudos}</span>
              </div>
            </div>
            <div className="w-px h-40 bg-white/50 ml-10 mr-20" />
            <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
              <p className="token-name text-14">Tokens</p>
              <div className="flex items-center mt-10">
                <img src="/assets/images/token.svg" alt="" className="h-16" />
                <span className="token-value font-bold text-24 leading-16 ml-2">{token}</span>
              </div>
            </div>
          </div>
        ) : kudos > 0 ? (
          <div className="flex justify-center items-center">
            <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
              <p className="point-name text-14 whitespace-nowrap">Kudos Points</p>
              <div className="flex items-center mt-10">
                <img src="/assets/images/decoration.svg" alt="" className="h-16" />
                <span className="point-value font-bold text-24 leading-16 ml-2">{kudos}</span>
              </div>
            </div>
          </div>
        ) : token > 0 ? (
          <div className="flex justify-center items-center">
            <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
              <p className="token-name text-14">Tokens</p>
              <div className="flex items-center mt-10">
                <img src="/assets/images/token.svg" alt="" className="h-16" />
                <span className="token-value font-bold text-24 leading-16 ml-2">{token}</span>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="w-full h-26" />
        {detail.category === NotificationCategoryType.TransferReceived && detail.section === 'admin' && (
          <p className="text-14 font-poppins font-bold text-center text-golden">Why did I win this?</p>
        )}
        <div className="w-full h-14" />

        {detail.category === NotificationCategoryType.TransferReceived && detail.section === 'admin' && (
          <p className="text-10 text-sf-gray-300 font-poppins text-center">{detail.detailContent}</p>
        )}

        <div className="w-full h-26" />
        <div className="flex">
          <span className="text-10 leading-20 font-poppins text-sf-zinc-400">
            {detail.category === NotificationCategoryType.TransferReceived
              ? 'Rewards sent to you by'
              : 'You sent kudos, token to'}
          </span>
          <span className="text-10 leading-20 font-poppins text-sf-yellow-700 ">&nbsp;{detail.section}</span>
        </div>

        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
      </div>
    </Modal>
  )
}

export default TransferSuccessModal
