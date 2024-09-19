import Modal, { ModalProps } from 'components/Modal'
import { useAppSelector } from 'hooks'
import Link from 'next/link'

import { classNames } from 'utils'
interface LevelUpModalProps extends ModalProps {
  detail: any
}

const LevelUpModal = ({ show, onClose, detail }: LevelUpModalProps) => {
  const { data, teamData } = useAppSelector((state) => state.user)
  const { memberLevelName1, memberLevelName2, memberLevelName3, memberLevelName4 } = teamData

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <p className="w-full text-22 font-poppins font-bold text-center text-golden">You Levelled Up!</p>
        <p className="text-16 text-sf-gray-300 text-center font-bold">You are now a</p>
        <div className="w-full h-20" />
        <img src={`/assets/images/tier-${detail.detailContent}.svg`} alt="" className="h-60" />
        <div className="w-full h-12" />
        <div className="flex flex-col items-center">
          <span
            className={classNames(
              'text-18 leading-22',
              Number(detail.detailContent) === 1
                ? 'text-sf-slate-300'
                : Number(detail.detailContent) === 2
                ? 'text-sf-sky-300'
                : Number(detail.detailContent) === 3
                ? 'text-sf-pink-400'
                : 'text-sf-yellow-200',
            )}
          >
            {Number(detail.detailContent) === 1
              ? memberLevelName1
              : Number(detail.detailContent) === 2
              ? memberLevelName2
              : Number(detail.detailContent) === 3
              ? memberLevelName3
              : memberLevelName4}
          </span>
          <span
            className={classNames(
              'text-18 leading-22',
              Number(detail.detailContent) === 1
                ? 'text-sf-slate-300'
                : Number(detail.detailContent) === 2
                ? 'text-sf-sky-300'
                : Number(detail.detailContent) === 3
                ? 'text-sf-pink-400'
                : 'text-sf-yellow-200',
            )}
          >{`(Level ${detail.detailContent})`}</span>
        </div>
        <div className="w-full h-20" />
        <div className="flex flex-col items-center">
          <span className="text-14 leading-20 font-poppins text-sf-zinc-400 text-center">
            You now have access to all the benefits of this level, including more platform discounts and unlocking more
            games and challenges.
          </span>
        </div>
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
          <span className="text-14 text-white uppercase">OK</span>
        </button>
        <Link href={`/play`}>
          <button className="w-260 h-40 bg-danger rounded-[4px] mt-10" onClick={onClose}>
            <span className="text-14 text-white uppercase">Keep Playing</span>
          </button>
        </Link>
      </div>
    </Modal>
  )
}

export default LevelUpModal
