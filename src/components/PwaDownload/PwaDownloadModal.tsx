import usePwa from 'hooks/usePwa'
import DownloadIcon from './DownloadIcon'

const PwaDownloadModal = () => {
  const { pwaStatus, onInstall, onReject } = usePwa()

  return !!pwaStatus && pwaStatus === 'uninstalled' ? (
    <div className="fixed z-50 left-0 bottom-0 w-full h-70 bg-danger">
      <div className="relative w-full h-full flex items-center justify-center">
        <DownloadIcon />
        <button className="text-16 sm:text-20 text-white uppercase ml-10 sm:ml-20" onClick={onInstall}>
          DOWNLOAD AG NATION AS AN APP
        </button>
        <button className="absolute top-10 right-20 text-16 sm:text-20 text-white uppercase" onClick={onReject}>
          X
        </button>
      </div>
    </div>
  ) : null
}

export default PwaDownloadModal
