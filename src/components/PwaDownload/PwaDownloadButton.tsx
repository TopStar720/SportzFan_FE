import usePwa from 'hooks/usePwa'
import DownloadIcon from './DownloadIcon'

const PwaDownloadButton = () => {
  const { pwaStatus, onInstall } = usePwa()

  return !!pwaStatus && pwaStatus !== 'installed' ? (
    <button
      className="hidden lg:flex justify-center items-center bg-danger rounded-[4px] px-8 py-6 mr-50"
      onClick={onInstall}
    >
      <DownloadIcon width="22" height="21" />
      <span className="text-14 text-white uppercase ml-6">DOWNLOAD AS AN APP</span>
    </button>
  ) : null
}

export default PwaDownloadButton
