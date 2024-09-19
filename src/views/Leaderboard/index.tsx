import { Fragment, useCallback, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'

import { classNames } from 'utils'
import SeasonLeaderboard from './components/SeasonLeaderboard'
import WeeklyLeaderboard from './components/WeeklyLeaderboard'
import GameLeaderboard from './components/GameLeaderboard'

const Leaderboard = () => {
  return (
    <Fragment>
      <div className="flex items-center mb-3">
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Leaderboards</p>
      </div>
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
                Season
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
                Weekly
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
                Games
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-20">
          <Tab.Panel>
            <SeasonLeaderboard />
          </Tab.Panel>
          <Tab.Panel>
            <WeeklyLeaderboard />
          </Tab.Panel>
          <Tab.Panel>
            <GameLeaderboard />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  )
}

export default Leaderboard
