import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import GameCard from '../components/GameCard'
import Slider from '../components/Slider'
import { useAppSelector } from 'hooks'

const GamesSection = () => {
  const games = useAppSelector((state) => state.games.data)
  const [latestGames, setLatestGames] = useState([])

  useEffect(() => {
    if (games.length > 3) {
      setLatestGames(games.slice(0, 3))
    } else {
      setLatestGames(games)
    }
  }, [games])

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/images/balls-yellow.svg" alt="" className="h-22 mr-10" />
          <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Games</p>
        </div>
        <Link href="/play/game/all">
          <button className="flex items-center mt-4">
            <span className="text-12 sm:text-14 text-sf-rose-700 leading-18 whitespace-nowrap">SEE All</span>
            <img src="/assets/images/forward.svg" alt="" className="h-12 sm:h-16 ml-4 sm:ml-8" />
          </button>
        </Link>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Play interactive trivia, predictor and mini games to win rewards
      </p>
      <div className="hidden md:grid grid-cols-3 gap-12 2xl:gap-18 mt-16">
        {latestGames.map((item) => (
          <GameCard key={`game-item-${item.id}`} {...item} />
        ))}
      </div>
      <div className="block md:hidden w-full">
        <Slider>
          {latestGames.map((item) => (
            <div key={`game-item-mobile-${item.id}`} className="px-10 pt-20 pb-40">
              <GameCard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default GamesSection
