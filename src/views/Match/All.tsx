import { Fragment, useCallback, useEffect, useState } from 'react'
import MatchCard from './components/MatchCard'
import { useAppDispatch } from 'hooks'
import { getUpcomingMatchesByPagination } from 'apis/match'

const Matches = () => {
  const dispatch = useAppDispatch()
  const [totalCount, setTotalCount] = useState(0)
  const [matches, setMatches] = useState([])

  // pagination options.
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [page, setPage] = useState(0)

  const fetchDataByPagination = useCallback(async () => {
    const skip = page * rowsPerPage
    try {
      const data = await getUpcomingMatchesByPagination(skip, rowsPerPage)
      let temp = [...matches]
      temp = temp.concat(data.data)
      setMatches(temp)
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
      <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Upcoming Matches</p>
      <div className="w-full h-20" />
      <div className="grid grid-cols md:grid-cols-3 gap-12 2xl:gap-18">
        {matches.map((item) => (
          <MatchCard key={`match-item-${item.id}`} {...item} />
        ))}
      </div>
      <button
        disabled={(page + 1) * rowsPerPage >= totalCount}
        onClick={() => changePageNum(1)}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 mt-10"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
    </Fragment>
  )
}

export default Matches
