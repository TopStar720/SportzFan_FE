import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import TeamAssets from './components/TeamAssets'
import SponsorAssets from './components/SponsorAssets'
import InGameAssets from './components/InGameAssets'
import { classNames } from 'utils'

const MyAssets = () => {
  return (
    <Fragment>
      <div className="flex items-center">
        <img src="/assets/images/hand-star-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">My Assets</p>
      </div>
      <div className="w-full h-14" />
      <Tab.Group>
        <Tab.List className="border-b-2 border-sf-zinc-600">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  'px-8 xs:px-20 py-6 xs:py-10 text-8 xs:text-10 sm:!text-12 leading-14 uppercase',
                  selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                )}
              >
                Team assets
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  'px-8 xs:px-20 py-6 xs:py-10 text-8 xs:text-10 sm:!text-12 leading-14 uppercase',
                  selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                )}
              >
                Sponsor Assets
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  'px-8 xs:px-20 py-6 xs:py-10 text-8 xs:text-10 sm:!text-12 leading-14 uppercase',
                  selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                )}
              >
                In Game Assets
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-20">
          <Tab.Panel>
            <TeamAssets />
          </Tab.Panel>
          <Tab.Panel>
            <SponsorAssets />
          </Tab.Panel>
          <Tab.Panel>
            <InGameAssets />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  )
}

export default MyAssets
