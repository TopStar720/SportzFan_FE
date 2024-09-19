import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { LogoutIcon, SettingsIcon, TriangleIcon, UserIcon } from './Icons'
import { useAppSelector } from 'hooks'
import { deleteLocalStorageValue } from 'hooks/useLocalStorage'

interface HeaderDropdownProps {
  disabled?: boolean
}

type HeaderData = {
  avatar: string
  firstName: string
  lastName: string
}

const HeaderDropdown = ({ disabled }: HeaderDropdownProps) => {
  const { avatar, firstName, lastName } = useAppSelector((state) => state.user).data
  const [data, setData] = useState<HeaderData>({
    avatar: '',
    firstName: '',
    lastName: '',
  })

  useEffect(() => {
    setData({ avatar, firstName, lastName })
  }, [avatar, firstName, lastName])

  const handleLogout = (close: () => void) => {
    deleteLocalStorageValue('token')
    close()
    document.location.href = '/'
  }

  return disabled ? (
    <button className="inline-flex justify-center items-center">
      <span className="hidden lg:block text-14 text-sf-gray-300 leading-20">{`${data.firstName} ${data.lastName}`}</span>
      <img
        src={data.avatar || '/assets/images/default-avatar.png'}
        className="w-26 lg:w-42 h-26 lg:h-42 rounded-full ml-10 mr-4 lg:mr-6"
      />
      <TriangleIcon />
    </button>
  ) : (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className="inline-flex justify-center items-center">
            <span className="hidden lg:block text-14 text-sf-gray-300 leading-20">{`${data.firstName} ${data.lastName}`}</span>
            <img
              src={data.avatar || '/assets/images/default-avatar.png'}
              className="w-26 lg:w-42 h-26 lg:h-42 rounded-full ml-10 mr-4 lg:mr-6"
            />
            <TriangleIcon />
          </Popover.Button>
          {open ? (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-64 z-20 mt-8 -translate-x-1/2 transform">
                <div className="overflow-hidden">
                  <div className="border border-sf-zinc-600 bg-dark rounded-[4px] shadow-lg p-16">
                    <Link href="/profile">
                      <button className="w-full flex items-center px-4" onClick={() => close()}>
                        <UserIcon />
                        <span className="text-14 leading-20 text-sf-gray-300 font-poppins whitespace-nowrap ml-10">
                          My Profile
                        </span>
                      </button>
                    </Link>
                    <Link href="/settings">
                      <button className="w-full flex items-center px-4 mt-16" onClick={() => close()}>
                        <SettingsIcon />
                        <span className="text-14 leading-20 text-sf-gray-300 font-poppins whitespace-nowrap ml-10">
                          Settings
                        </span>
                      </button>
                    </Link>
                    <button className="w-full flex items-center px-4 mt-16" onClick={() => handleLogout(close)}>
                      <LogoutIcon />
                      <span className="text-14 leading-20 text-sf-gray-300 font-poppins whitespace-nowrap ml-10">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          ) : null}
        </>
      )}
    </Popover>
  )
}

export default HeaderDropdown
