import { Fragment, useCallback, useEffect, useState } from 'react'
import ConfirmModal from 'views/Offer/components/ConfirmModal'
import SuccessModal from 'views/Offer/components/SuccessModal'
import NotifyModal from './NotifyModal'
import SponsorOfferCard from './SponsorOfferCard'
import { getAssetList, redeemAsset } from 'apis/asset'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'
import { Asset, AssetType, NotifyType } from '../types'

const SponsorOffers = () => {
  const dispatch = useAppDispatch()
  const { kudosAmount, tokenAmount } = useAppSelector((state) => state.user).data
  const [assets, setAssets] = useState<Asset[]>([])
  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showNotifyModal, setShowNotifyModal] = useState<boolean>(false)
  const [notifyType, setNotifyType] = useState<NotifyType>(NotifyType.token)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getAssetList(page * rowsPerPage, rowsPerPage, AssetType.Sponsor)
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

  const onRedeem = (asset: Asset) => {
    setSelectedAsset(asset)
    const { tokenRequired, kudosEligible } = asset
    if (tokenAmount < tokenRequired) {
      setNotifyType(NotifyType.token)
      setShowNotifyModal(true)
    } else if (kudosAmount < kudosEligible) {
      setNotifyType(NotifyType.kudos)
      setShowConfirmModal(true)
    } else {
      setShowConfirmModal(true)
    }
  }

  const onConfirm = () => {
    setShowConfirmModal(false)
    dispatch(setLoading(true))
    redeemAsset(selectedAsset.id)
      .then(() => {
        dispatch(setLoading(false))
        setShowSuccessModal(true)
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  const onClose = () => {
    setShowSuccessModal(false)
    setAssets([])
    fetchData()
  }

  return (
    <Fragment>
      {assets.map((item, idx) => (
        <SponsorOfferCard key={`sponsor-offer-card-item-${item.id}-${idx}`} data={item} onRedeem={onRedeem} />
      ))}
      <button
        disabled={totalCount <= rowsPerPage * (page + 1)}
        onClick={() => setPage((prev) => prev + 1)}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 mt-4"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
      <ConfirmModal
        need={selectedAsset?.tokenRequired}
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onConfirm}
      />
      <SuccessModal show={showSuccessModal} onClose={onClose} />
      <NotifyModal
        notifyType={notifyType}
        need={
          notifyType === NotifyType.token
            ? Math.floor(selectedAsset?.tokenRequired - tokenAmount)
            : Math.floor(selectedAsset?.kudosEligible - kudosAmount) || 0
        }
        show={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
      />
    </Fragment>
  )
}

export default SponsorOffers
