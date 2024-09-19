import { Fragment, useCallback, useEffect, useState } from 'react'
import ClaimModal from './ClaimModal'
import MyAssetCard from './MyAssetCard'
import { getMyAssetList } from 'apis/asset'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { AssetType, MyAsset } from 'views/Marketplace/types'

const TeamAssets = () => {
  const dispatch = useAppDispatch()
  const [assets, setAssets] = useState<MyAsset[]>([])
  const [selectedAsset, setSelectedAsset] = useState<MyAsset>()
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getMyAssetList(page * rowsPerPage, rowsPerPage, AssetType.Team)
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

  const onShowClaimModal = (data: MyAsset) => {
    setSelectedAsset(data)
    setShowClaimModal(true)
  }

  const onClose = () => {
    setShowClaimModal(false)
    setAssets([])
    fetchData()
  }

  return (
    <Fragment>
      {assets.map((item) => (
        <MyAssetCard key={`my-asset-card-${item.id}`} data={item} onShowClaimModal={onShowClaimModal} />
      ))}
      <button
        disabled={totalCount <= rowsPerPage * (page + 1)}
        onClick={() => setPage((prev) => prev + 1)}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 mt-4"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
      <ClaimModal show={showClaimModal} onClose={onClose} data={selectedAsset} />
    </Fragment>
  )
}

export default TeamAssets
