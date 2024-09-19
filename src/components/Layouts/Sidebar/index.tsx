import { FC, Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { IconProps } from 'components/Icon'
import {
  EditIcon,
  GridIcon,
  HandbagIcon,
  HomeIcon,
  InfoIcon,
  PuzzleIcon,
  SelectMultipleIcon,
  ShareIcon,
  StarIcon,
} from './Icons'
import SidebarPwaDownloadButton from 'components/PwaDownload/SidebarPwaDownloadButton'
import { useAppSelector } from 'hooks'
import { classNames, nFormatter } from 'utils'

type LinkProps = {
  href: string
  title: string
  icon: FC<IconProps>
  onClose?: () => void
}

const ActiveLink = ({ href, title, icon: Icon, onClose, ...props }: LinkProps) => {
  const router = useRouter()
  const isActive = router.pathname.includes(href)

  return (
    <Link href={href} passHref {...props}>
      <button
        className={classNames(
          'w-full flex items-center px-36 sm:px-32 py-12',
          isActive ? 'bg-gradient-to-r from-sf-rose-700 to-sf-zinc-900' : '',
        )}
        onClick={onClose}
      >
        <Icon color={isActive ? '#ffffff' : '#9c9ca4'} />
        <span className={classNames('text-14 leading-16 ml-14', isActive ? 'text-white' : 'text-sf-zinc-400')}>
          {title}
        </span>
      </button>
    </Link>
  )
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { avatar, firstName, lastName, kudosAmount, tokenAmount } = useAppSelector((state) => state.user).data
  const [data, setData] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    kudosAmount: 0,
    tokenAmount: 0,
  })

  useEffect(() => {
    setData({ avatar, firstName, lastName, kudosAmount, tokenAmount })
  }, [avatar, firstName, lastName, kudosAmount, tokenAmount])

  return (
    <Fragment>
      <div className="sidebar hidden lg:block">
        <ActiveLink href="/home" title={'Home'} icon={HomeIcon} />
        <ActiveLink href="/play" title={'Play'} icon={PuzzleIcon} />
        <ActiveLink href="/leaderboard" title={'Leaderboard'} icon={SelectMultipleIcon} />
        <ActiveLink href="/wallet" title={'My Wallet'} icon={GridIcon} />
        <ActiveLink href="/marketplace" title={'Marketplace'} icon={HandbagIcon} />
        <ActiveLink href="/rewards" title={'My Rewards'} icon={StarIcon} />
        <ActiveLink href="/referral" title={'Refer A Friend'} icon={ShareIcon} />
        <ActiveLink href="/help" title={'Help & Support'} icon={InfoIcon} />
        <div className="flex justify-center items-center mt-70">
          <span className="text-10 text-sf-zinc-400/50 font-poppins leading-20 mr-6">Powered by :</span>
          <img src="/assets/images/sportzfan-logo.svg" alt="Sportzfan logo" className="h-14" />
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-300"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-300"
              >
                <Dialog.Panel>
                  <div className="mobile-menu">
                    <div>
                      <div className="flex flex-col items-center bg-gradient-to-b from-sf-rose-700/70 to-sf-zinc-1000/0 pt-40 pb-16">
                        <button className="button-avatar-edit">
                          <img
                            src={data.avatar || '/assets/images/default-avatar.png'}
                            className="w-80 h-80 rounded-full"
                          />
                          <span className="icon-avatar-edit right-px bottom-px">
                            <EditIcon />
                          </span>
                        </button>
                        <p className="text-14 text-sf-gray-300 leading-20 my-12">{`${data.firstName} ${data.lastName}`}</p>
                        <div className="w-full flex justify-center items-center">
                          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
                            <img src="/assets/images/decoration.svg" alt="" className="h-20" />
                            <div className="flex flex-col ml-4">
                              <span className="point-name text-10 leading-14">Kudos Points</span>
                              <span className="point-value font-bold leading-18">
                                {nFormatter(data.kudosAmount, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="w-px h-24 bg-white/50 mx-14" />
                          <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)]">
                            <img src="/assets/images/token.svg" alt="" className="h-20" />
                            <div className="flex flex-col ml-4">
                              <span className="token-name text-10 leading-14">Tokens</span>
                              <span className="token-value font-bold leading-18">
                                {nFormatter(data.tokenAmount, 2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ActiveLink href="/home" title={'Home'} icon={HomeIcon} onClose={onClose} />
                      <ActiveLink href="/play" title={'Play'} icon={PuzzleIcon} onClose={onClose} />
                      <ActiveLink
                        href="/leaderboard"
                        title={'Leaderboard'}
                        icon={SelectMultipleIcon}
                        onClose={onClose}
                      />
                      <ActiveLink href="/wallet" title={'My Wallet'} icon={GridIcon} onClose={onClose} />
                      <ActiveLink href="/marketplace" title={'Marketplace'} icon={HandbagIcon} onClose={onClose} />
                      <ActiveLink href="/rewards" title={'My Rewards'} icon={StarIcon} onClose={onClose} />
                      <ActiveLink href="/referral" title={'Refer A Friend'} icon={ShareIcon} onClose={onClose} />
                      <ActiveLink href="/help" title={'Help & Support'} icon={InfoIcon} onClose={onClose} />
                    </div>
                    <div>
                      <SidebarPwaDownloadButton />
                      <div className="flex justify-center items-center my-16">
                        <span className="text-10 text-sf-zinc-400/50 font-poppins leading-20 mr-6">Powered by :</span>
                        <img src="/assets/images/sportzfan-logo.svg" alt="Sportzfan logo" className="h-14" />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  )
}

export default Sidebar
