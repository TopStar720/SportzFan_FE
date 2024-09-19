import Modal, { ModalProps } from 'components/Modal'
import { useAppDispatch } from 'hooks'

import { deleteNotification } from 'store/notifications'

const NotificationDeleteModal = ({ show, onClose }: ModalProps) => {
  const dispatch = useAppDispatch()
  const handleDelete = () => {
    dispatch(deleteNotification())
    onClose()
  }
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center pt-50 pb-34 px-20 sm:px-50">
        <div className="w-full h-20" />
        <div className="relative w-full h-186">
          <img src="/assets/images/shine-small.svg" alt="" className="h-full m-auto" />
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-150 -mt-20" />
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-center items-center">
            <img src="/assets/images/del-noti.svg" alt="" className="mt-20" />
          </div>
        </div>
        <div className="w-full h-12" />
        <p className="w-full text-20 font-poppins font-bold text-center text-golden">
          Are you sure you want to clear your notifications?
        </p>
        <div className="w-full h-20" />
        <div className="w-full h-14" />
        <button className="w-260 h-40 bg-secondary rounded-[4px] mb-3" onClick={onClose}>
          <span className="text-14 text-white uppercase">GO BACK</span>
        </button>
        <button className="w-260 h-40 bg-danger rounded-[4px]" onClick={handleDelete}>
          <span className="text-14 text-white uppercase">YES, CLEAR THEM</span>
        </button>
      </div>
    </Modal>
  )
}

export default NotificationDeleteModal
