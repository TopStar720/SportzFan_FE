import { Fragment, useCallback, useEffect, useState } from 'react'
import OfferCard from './components/OfferCard'
import { getAssetList } from 'apis/asset'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { Asset } from 'views/Marketplace/types'

const Offers = () => {
  const dispatch = useAppDispatch()
  const [assets, setAssets] = useState<Asset[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getAssetList(page * rowsPerPage, rowsPerPage)
      .then((res) => {
        const { count, data } = res
        const temp = [...assets]
        setAssets(temp.concat(data))
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
      <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Latest Offers</p>
      <div className="w-full h-20" />
      {assets.map((item, idx) => (
        <OfferCard key={`offer-card-item-${item.id}-${idx}`} {...item} />
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

export default Offers
