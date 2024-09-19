import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import GameCard from 'views/Play/components/GameCard'
import { getMyGameList } from 'apis/game'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { GameData } from 'views/Play/types'

const MyGames = () => {
  const dispatch = useAppDispatch()
  const [games, setGames] = useState<GameData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [page, setPage] = useState(0)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getMyGameList(page * rowsPerPage, rowsPerPage)
      .then((res) => {
        const { count, data } = res
        const temp = [...games]
        setGames(temp.concat(data))
        setTotalCount(count)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [dispatch, page, rowsPerPage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Fragment>
      <div className="flex items-center">
        <img src="/assets/images/balls-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">My Games</p>
      </div>
      <div className="w-full h-14" />
      {games.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 2xl:gap-18">
            {games.map((item) => (
              <GameCard key={`game-card-${item.id}`} {...item} />
            ))}
          </div>
          <div className="w-full h-20" />
          <button
            disabled={totalCount <= rowsPerPage * (page + 1)}
            onClick={() => setPage((prev) => prev + 1)}
            className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 mt-4"
          >
            <span className="text-14 text-white uppercase leading-18">View More</span>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center bg-secondary-light rounded-[4px] border border-sf-zinc-600 px-20 py-52">
          <img src="/assets/images/piece-puzzle-yellow.svg" alt="" className="h-74" />
          <div className="w-full h-20" />
          <p className="max-w-378 text-14 text-sf-neutral-300 font-poppins text-center">
            You have no active games in play. Click below to view what games you can participate in
          </p>
          <div className="w-full h-30" />
          <Link href={`/play/game/all`}>
            <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-20 py-10">
              View Games
            </button>
          </Link>
        </div>
      )}
    </Fragment>
  )
}

export default MyGames
