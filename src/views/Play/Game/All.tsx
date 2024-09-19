import { Fragment, useCallback, useEffect, useState } from 'react'
import GameDetailsCard from '../components/GameDetailsCard'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getPageGames } from 'store/games'
import { SvgIcon } from 'components/Icon'
import { getGamesByPagination } from 'apis/game'

const Games = () => {
  const dispatch = useAppDispatch()
  const [totalCount, setTotalCount] = useState(0)
  const [games, setGames] = useState([])

  // pagination options.
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const fetchDataByPagination = useCallback(async () => {
    const skip = page * rowsPerPage
    try {
      const data = await getGamesByPagination(skip, rowsPerPage)
      let temp = [...games]
      temp = temp.concat(data.data)
      setGames(temp)
      setTotalCount(data.count)
    } catch {
      setPage((prevState) => prevState - 1)
    }
  }, [dispatch, page, rowsPerPage])

  useEffect(() => {
    fetchDataByPagination()
  }, [fetchDataByPagination])

  const changePageNum = (direct: number) => {
    const maxPageNum = Math.floor(totalCount / rowsPerPage)
    if (page === 0 && direct === -1) return
    if (page === maxPageNum && direct === 1) return

    setPage((prevState) => prevState + direct)
  }

  return (
    <Fragment>
      <div className="w-full h-12" />
      <div className="flex items-center">
        <img src="/assets/images/balls-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Games</p>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Play interactive trivia, predictor and mini games to win rewards
      </p>
      <div className="w-full h-16" />
      {games.map((item) => (
        <GameDetailsCard key={`game-item-${item.id}`} {...item} />
      ))}
      <button
        disabled={(page + 1) * rowsPerPage >= totalCount}
        onClick={() => changePageNum(1)}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
    </Fragment>
  )
}

export default Games
