import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ConfirmModal from './components/ConfirmModal'
import SuccessModal from './components/SuccessModal'
import { getAsset, redeemAsset } from 'apis/asset'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'
import { Asset, AssetCategory } from 'views/Marketplace/types'
import { getDateTimeString } from 'utils'

const Offer = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const { kudosAmount, tokenAmount } = useAppSelector((state) => state.user).data
  const [data, setData] = useState<Asset>()
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  const loadData = useCallback(() => {
    if (!id) {
      return
    }

    setLoading(true)
    getAsset(id as string)
      .then((res: Asset) => {
        setData(res)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [id, dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onConfirm = () => {
    setShowConfirmModal(false)
    dispatch(setLoading(true))
    redeemAsset(data?.id)
      .then(() => {
        dispatch(setLoading(false))
        setShowSuccessModal(true)
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  return !!data ? (
    <Fragment>
      <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden">
        <img src="/assets/images/bg-with-spiral-curves.png" alt="" className="absolute inset-0 w-full h-full" />
        <div className="absolute w-full h-full flex justify-center items-center xl:justify-end">
          <img
            src={`/assets/images/${
              data?.category === AssetCategory.Merchandise
                ? 't-shirt'
                : data?.category === AssetCategory.Tickets
                ? 'swipe-card'
                : data?.category === AssetCategory.VIPPass
                ? 'vip-card'
                : data?.category === AssetCategory.ExclusiveContent
                ? 'handshake'
                : 'ring'
            }-yellow-light.svg`}
            alt=""
            className="h-100 xl:mr-50"
          />
        </div>
        <div className="relative flex flex-col items-center xl:items-start text-center xl:text-left sm:px-20 px-30 py-22 md:py-30">
          <img src={data?.imageUrl} alt="" className="h-100 md:h-120" />
          <div className="w-full h-20 md:h-30" />
          <p className="text-14 md:text-20 leading-16 text-sf-gray-300 font-bold mx-20 md:mx-0">{data?.title}</p>
          <div className="w-full h-10 xl:h-20" />
          <div className="flex flex-col sm:flex-row items-center text-left">
            <div className="flex justify-between md:justify-center items-center">
              <div className="h-full flex items-center sm:flex-col sm:items-start justify-between">
                <p className="text-8 md:text-10 text-sf-zinc-400 font-poppins">Expires On :</p>
                <p className="text-10 md:text-18 text-sf-yellow-700 leading-20">{getDateTimeString(data?.end)}</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-20 xl:h-30 bg-white/50 mx-20" />
            <div className="flex items-center">
              <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)] mt-10 sm:mt-0">
                <img src="/assets/images/token.svg" alt="" className="h-24" />
                <div className="flex flex-col justify-between ml-6">
                  <span className="token-name text-8 md:text-10">Price</span>
                  <span className="token-value text-20 leading-16 font-bold">{data?.tokenRequired}</span>
                </div>
              </div>
              <div className="w-px h-20 xl:h-30 bg-white/50 mx-20 mt-10 sm:mt-0" />
              <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,37,71,1)] mt-10 sm:mt-0">
                <img src="/assets/images/decoration.svg" alt="" className="h-24" />
                <div className="flex flex-col justify-between ml-6">
                  <span className="point-name text-8 md:text-10">You Must Hold</span>
                  <span className="point-value text-20 leading-16 font-bold">{data?.kudosEligible}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-26 py-20">
        <p className="text-14 text-sf-zinc-400 font-poppins mt-6">{data?.description}</p>
        <div className="flex flex-col-reverse sm:flex-row items-center mt-20">
          <div className="flex justify-center mt-10 sm:mt-0">
            <Link href="/marketplace">
              <button className="block md:hidden w-140 h-40 bg-secondary rounded-[4px] text-14 text-white uppercase">
                Back
              </button>
            </Link>
            <button
              disabled={
                data?.totalCount - data?.purchaseCount < 1 ||
                tokenAmount < data?.tokenRequired ||
                kudosAmount < data?.kudosEligible
              }
              className="w-140 h-40 bg-danger rounded-[4px] text-14 text-white uppercase ml-14 md:ml-0"
              onClick={() => setShowConfirmModal(true)}
            >
              Redeem
            </button>
          </div>
          {data?.totalCount - data?.purchaseCount < 6 ? (
            <span className="text-14 text-sf-green-500 font-poppins ml-16">
              Only {data?.totalCount - data?.purchaseCount} left to redeem
            </span>
          ) : null}
        </div>
      </div>
      {tokenAmount < data?.tokenRequired ? (
        <div className="w-fit bg-warning flex flex-col sm:flex-row items-center px-24 py-10 rounded-[25px] mt-20">
          <div className="flex items-center">
            <img src="/assets/images/padlock-yellow.svg" alt="" className="h-20" />
            <span className="text-12 text-white font-poppins leading-20 ml-14 mr-6">
              You need {Math.floor(data?.tokenRequired - tokenAmount)} more tokens to redeem, You have to earn more
              tokens
            </span>
          </div>
          <div className="flex mt-10 sm:mt-0">
            <Link href="/play">
              <button className="w-[50px] h-[25px] bg-danger rounded-[5px] ml-8">
                <span className="text-10 text-white uppercase leading-12">EARN</span>
              </button>
            </Link>
          </div>
        </div>
      ) : kudosAmount < data?.kudosEligible ? (
        <div className="w-fit bg-warning flex flex-col sm:flex-row items-center px-24 py-10 rounded-[25px] mt-20">
          <div className="flex items-center">
            <img src="/assets/images/padlock-yellow.svg" alt="" className="h-20" />
            <span className="text-12 text-white font-poppins leading-20 ml-14 mr-6">
              You need {Math.floor(data?.kudosEligible - kudosAmount)} more kudos to redeem, You have to earn more kudos
            </span>
          </div>
          <div className="flex mt-10 sm:mt-0">
            <Link href="/play">
              <button className="w-[50px] h-[25px] bg-danger rounded-[5px] ml-8">
                <span className="text-10 text-white uppercase leading-12">EARN</span>
              </button>
            </Link>
          </div>
        </div>
      ) : null}
      <ConfirmModal
        need={data?.tokenRequired}
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onConfirm}
      />
      <SuccessModal data={data} show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </Fragment>
  ) : null
}

export default Offer
