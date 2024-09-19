import Link from 'next/link'
import PwaDownloadButton from 'components/PwaDownload/PwaDownloadButton'
import Notification from './Notification'
import HeaderDropdown from './HeaderDropdown'
import { MenuIcon } from './Icons'
import { useAppSelector } from 'hooks'

interface HeaderProps {
  onMenuClick?: () => void
  disabled?: boolean
  isHome?: boolean
}

const Header = ({ onMenuClick, disabled, isHome }: HeaderProps) => {
  const isntSeen = useAppSelector((state) => state.notifications.isntSeen)

  return (
    <header className="flex justify-between items-center py-10">
      <button className="block lg:hidden p-4" onClick={onMenuClick}>
        <MenuIcon />
      </button>
      {!disabled ? (
        <Link href="/home">
          <img
            src="/assets/images/adelaide-logo.svg"
            alt="Adelaide logo"
            className="h-30 lg:h-60 cursor-pointer ml-44 lg:ml-0"
          />
        </Link>
      ) : (
        <img
          src="/assets/images/adelaide-logo.svg"
          alt="Adelaide logo"
          className="h-30 lg:h-60 cursor-pointer ml-44 lg:ml-0"
        />
      )}
      <div className="flex items-center">
        {isHome ? null : <PwaDownloadButton />}
        <Notification content={isntSeen} disabled={disabled} />
        <div className="h-26 lg:h-42 ml-4 lg:ml-20">
          <HeaderDropdown disabled={disabled} />
        </div>
      </div>
    </header>
  )
}

export default Header
