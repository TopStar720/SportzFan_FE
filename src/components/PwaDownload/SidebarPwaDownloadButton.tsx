import usePwa from 'hooks/usePwa'
import DownloadIcon from './DownloadIcon'

const SidebarPwaDownloadButton = () => {
  const { pwaStatus, onInstall } = usePwa()

  return !!pwaStatus && pwaStatus !== 'installed' ? (
    <button className="w-full flex justify-center items-center bg-danger rounded-[4px] py-8 mt-16" onClick={onInstall}>
      <DownloadIcon width="23" height="22" />
      <span className="text-14 text-white uppercase ml-6">DOWNLOAD AS AN APP</span>
    </button>
  ) : null
}

export default SidebarPwaDownloadButton
