import { Fragment, useState } from 'react'
import { MyAsset } from 'views/Marketplace/types'
import ClaimModal from './ClaimModal'
import MyAssetCard from './MyAssetCard'

const InGameAssets = () => {
  const [assets, setAssets] = useState<MyAsset[]>([])
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false)
  const [claimModalData, setClaimModalData] = useState<MyAsset>()

  const onShowClaimModal = (data: MyAsset) => {
    setShowClaimModal(true)
  }

  return (
    <Fragment>
      {assets.map((item) => (
        <MyAssetCard key={`my-asset-card-${item.id}`} data={item} onShowClaimModal={onShowClaimModal} />
      ))}
      <ClaimModal show={showClaimModal} onClose={() => setShowClaimModal(false)} data={claimModalData} />
    </Fragment>
  )
}

export default InGameAssets
