import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import Credit from './components/Credit'
import Crypto from './components/Crypto'
import { classNames } from 'utils'

const Payment = () => {
  const router = useRouter()
  const { amount } = router.query
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!amount) {
      router.push('/wallet')
    }
  }, [router, amount])

  return (
    <div className="flex justify-center items-center xs:py-20">
      <div className="max-w-400 w-full">
        <p className="text-24 text-sf-gray-300 font-bold xs:text-center">Payment Detail</p>
        <div className="w-full h-20 xs:h-36" />
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="border-b-2 border-sf-zinc-600">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'w-1/2 py-8 xs:py-10 text-12 leading-14 uppercase',
                    selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                  )}
                >
                  <div className="flex justify-center items-center">
                    <img src="/assets/images/cards-yellow.svg" alt="" className="h-24 xs:h-26 mr-10" />
                    <span>Credit/debit</span>
                  </div>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'w-1/2 py-8 xs:py-10 text-12 leading-14 uppercase',
                    selected ? 'bg-gradient-to-b from-sf-zinc-900 to-sf-rose-700 text-sf-gray-300' : 'text-sf-zinc-400',
                  )}
                >
                  <div className="flex justify-center items-center">
                    <img src="/assets/images/coins-yellow.svg" alt="" className="h-24 xs:h-26 mr-10" />
                    <span>Crypto</span>
                  </div>
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="py-16">
            <Tab.Panel>
              <Credit amount={amount} />
            </Tab.Panel>
            <Tab.Panel>
              <Crypto onBack={() => setSelectedIndex(0)} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Payment
