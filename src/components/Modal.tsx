import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export interface ModalProps {
  show: boolean
  onClose: () => void
  children?: ReactNode
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center"
        open={show}
        onClose={onClose}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-black/80" />
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div className="z-50 p-20">{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
