import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import Support from './components/Support'
import Faq from './components/Faq'
import { classNames } from 'utils'

const Help = () => {
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
                {'Help & Support'}
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
                FAQ's
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-20">
          <Tab.Panel>
            <Support />
          </Tab.Panel>
          <Tab.Panel>
            <Faq />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  )
}

export default Help
