import { Fragment, useCallback, useEffect, useState } from 'react'
import HistoryOfferCard from './HistoryOfferCard'
import { getMyAssetList } from 'apis/asset'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { MyAsset } from '../types'

const History = () => {
  const dispatch = useAppDispatch()
  const [myAssets, setMyAssets] = useState<MyAsset[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getMyAssetList(page * rowsPerPage, rowsPerPage)
      .then((res) => {
        const { count, data } = res
        const temp = [...myAssets]
        setMyAssets(temp.concat(data))
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
      {myAssets.map((item, idx) => (
        <HistoryOfferCard key={`offer-history-item-${item.id}-${idx}`} {...item} />
      ))}
      <button
        disabled={totalCount <= rowsPerPage * (page + 1)}
        onClick={() => setPage((prev) => prev + 1)}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 mt-4"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
    </Fragment>
  )
}

export default History
