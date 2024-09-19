import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import TeamOffers from './components/TeamOffers'
import SponsorOffers from './components/SponsorOffers'
import History from './components/History'
import { classNames } from 'utils'

const Marketplace = () => {
  return (
    <Fragment>
      <Tab.Group>
        <Tab.List className="border-b-2 border-sf-zinc-600">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  'px-8 xs:px-20 py-6 xs:py-10 text-10 xs:text-12 leading-14 uppercase',
                  selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                )}
              >
                Team Offers
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  'px-8 xs:px-20 py-6 xs:py-10 text-10 xs:text-12 leading-14 uppercase',
                  selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                )}
              >
                Sponsor Offers
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={classNames(
                  'px-8 xs:px-20 py-6 xs:py-10 text-10 xs:text-12 leading-14 uppercase',
                  selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                )}
              >
                History
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-20">
          <Tab.Panel>
            <TeamOffers />
          </Tab.Panel>
          <Tab.Panel>
            <SponsorOffers />
          </Tab.Panel>
          <Tab.Panel>
            <History />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  )
}

export default Marketplace
