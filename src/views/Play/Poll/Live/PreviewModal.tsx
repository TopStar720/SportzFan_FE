import Modal, { ModalProps } from 'components/Modal'

interface PreviewModalProps extends ModalProps {
  url: string
  onSelect: () => void
}

const PreviewModal = ({ show, url, onClose, onSelect }: PreviewModalProps) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-600">
        <img src={url} alt="" className="w-full rounded-[8px]" />
        <div className="w-full h-30" />
        <div className="flex justify-center">
          <button className="w-130 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Cancel</span>
          </button>
          <div className="w-12 h-full" />
          <button className="w-130 h-40 bg-danger rounded-[4px]" onClick={onSelect}>
            <span className="text-14 text-white uppercase">Select</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PreviewModal
