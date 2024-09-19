import { getTransaction } from 'apis/transaction'
import Modal, { ModalProps } from 'components/Modal'
import { useAppSelector } from 'hooks'
import { useEffect, useState } from 'react'
import { TransactionType } from 'views/Wallet/types'
import { NotificationCategoryType, NotificationTypeEnum } from '../types'

interface CongratesModalProps extends ModalProps {
  detail: any
}

const CongratesModal = ({ show, onClose, detail }: CongratesModalProps) => {

  const { teamData } = useAppSelector((state) => state.user)  

  const [kudos, setKudos] = useState(0)
  const [token, setToken] = useState(0)

  const fetchTransaction = async (id: string) => {
    const data = await getTransaction(id)
    setKudos(data.kudosAmount || 0);
    setToken(data.tokenAmount || 0);    
  }

  useEffect(() => {
    if (
      detail.category === NotificationCategoryType.Auth &&
      detail.type === NotificationTypeEnum.Reward &&
      detail.section !== TransactionType.EarlySignUpReward&&
      detail.uniqueId &&
      detail.uniqueId !== ''
    ) {      
      fetchTransaction(detail.uniqueId)
    }
  }, [detail])

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        {detail.section === 'EarlySignUpReward' && (
          <p className="w-full text-22 font-poppins font-bold text-center text-golden mt-10">Congratulations!</p>
        )}
        <div className="relative w-full h-186">
          <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150 -mt-20" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/like-yellow.svg" alt="" className="w-70 -mt-20" />
          </div>
        </div>
        <p className="w-full text-22 font-poppins font-bold text-center text-golden -mt-40">You Win</p>
        <div className="w-full h-20" />
        <div className="flex justify-center items-center">
          <div className="drop-shadow-[0_0_12px_rgba(204,143,0,1)] w-full flex flex-col items-center">
            <p className="point-name text-14 whitespace-nowrap">Kudos Points</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/decoration.svg" alt="" className="h-16" />
              <span className="point-value font-bold text-24 leading-16 ml-2">{detail.section ===TransactionType.EarlySignUpReward?"500": kudos}</span>
            </div>
          </div>
          <div className="w-px h-40 bg-white/50 ml-10 mr-20" />
          <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)] w-full flex flex-col items-center">
            <p className="token-name text-14">Tokens</p>
            <div className="flex items-center mt-10">
              <img src="/assets/images/token.svg" alt="" className="h-16" />
              <span className="token-value font-bold text-24 leading-16 ml-2">{detail.section ===TransactionType.EarlySignUpReward?"1000":token}</span>
            </div>
          </div>
        </div>
        {detail.section === 'EarlySignUpReward' ? (
          <p className="text-14 text-sf-gray-300 font-poppins mt-20 text-center">
            For being one of the 1st fans to sign up to our fan engagement platform.
          </p>
        ) : (
          <div className="flex mt-20 items-center">
            <span className="text-10 leading-20 font-poppins text-sf-zinc-400">Rewards sent to you by</span>
            <img src={teamData.logo} alt="" className="w-100 ml-12" />
          </div>
        )}

        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
      </div>
    </Modal>
  )
}

export default CongratesModal
