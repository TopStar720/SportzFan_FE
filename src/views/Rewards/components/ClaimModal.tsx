import { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Link from 'next/link'
import Modal, { ModalProps } from 'components/Modal'
import { ClaimType, MyAsset } from 'views/Marketplace/types'
import Progressbar from 'components/Progressbar'
import { claimAsset } from 'apis/asset'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { getDateString } from 'utils'

interface ClaimModalProps extends ModalProps {
  data: MyAsset
}

const ClaimModal = ({ show, onClose, data }: ClaimModalProps) => {
  if (!data) {
    return null
  }

  const dispatch = useAppDispatch()
  const { id, createdAt, asset, couponId, claimDate } = data
  const { claimType, title, imageUrl, description, claimDescription, coupons, claimUrl } = asset
  const myCoupon = coupons.find((item) => item.id === couponId)
  const [codeCopied, setCodeCopied] = useState<boolean>(false)
  const [startClaim, setStartClaim] = useState<boolean>(false)
  const [completeClaim, setCompleteClaim] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    setCodeCopied(false)
    setStartClaim(false)
    setCompleteClaim(false)
    setProgress(0)
  }, [show])

  const startCounter = () => {
    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          onClaimAsset()
          clearInterval(intervalRef.current)
          intervalRef.current = null
          return 100
        } else {
          return prevProgress + 10
        }
      })
    }, 300)
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setProgress(0)
    }
  }

  const onClaimAsset = () => {
    dispatch(setLoading(true))
    claimAsset(id)
      .then(() => {
        setCompleteClaim(true)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="max-w-660 bg-sf-zinc-900 rounded-[4px] flex flex-col md:flex-row items-stretch p-26">
        <div className="min-w-188 md:min-w-266 rounded-[4px] border border-sf-zinc-600 flex justify-center items-center px-24 py-56">
          <img src={imageUrl} alt="" className="w-140 md:w-218" />
        </div>
        <div className="mt-24 md:mt-0 md:ml-26 max-w-300 md:!max-w-full w-full">
          <p className="text-18 text-sf-gray-300 text-center md:text-left min-w-280">{title}</p>
          {!claimDate ? (
            !startClaim ? (
              <>
                {claimType === ClaimType.Digital ? (
                  <>
                    <div className="w-full h-12" />
                    <div className="flex md:flex-col justify-center">
                      <p className="text-14 text-sf-yellow-700 font-poppins">Description:</p>
                      <p className="text-14 text-sf-gray-300 font-poppins ml-4 md:ml-0">{description}</p>
                    </div>
                    <div className="w-full h-12" />
                    <div className="flex md:flex-col justify-center items-center md:items-start">
                      <p className="text-14 text-sf-yellow-700 font-poppins">Date of redemption:</p>
                      <p className="text-14 text-sf-gray-300 font-poppins ml-4 md:ml-0">{getDateString(createdAt)}</p>
                    </div>
                    <div className="w-full h-12" />
                    <p className="text-14 text-sf-yellow-700 font-poppins text-center md:text-left">How to Claim</p>
                    <p className="text-14 text-sf-gray-300 font-poppins text-center md:text-left px-20 md:px-0 md:pr-10">
                      {claimDescription}
                    </p>
                    <div className="w-full h-20" />
                    <div className="grid md:grid-cols-2 gap-14">
                      <CopyToClipboard text={myCoupon?.code || ''} onCopy={() => setCodeCopied(true)}>
                        <button className="bg-secondary rounded-[4px] py-10 text-14 uppercase">
                          {codeCopied ? (
                            <span className="text-sf-green-500 w-full flex justify-center items-center">
                              CODE COPIED
                              <img src="/assets/images/check-circle-green.svg" alt="" className="h-20 ml-6" />
                            </span>
                          ) : (
                            <span className="text-white">Copy Code</span>
                          )}
                        </button>
                      </CopyToClipboard>
                      <a
                        href={claimUrl.slice(0, 4) === 'http' ? claimUrl : `https://${claimUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="w-full bg-secondary rounded-[4px] py-10 text-14 text-white uppercase">
                          Claim with link
                        </button>
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-12" />
                    <p className="text-14 text-sf-yellow-700 font-poppins text-center md:text-left">Description:</p>
                    <p className="text-14 text-sf-gray-300 font-poppins text-center md:text-left px-20 md:px-0 md:pr-10">
                      {description}
                    </p>
                    <div className="w-full h-12" />
                    <div className="flex md:flex-col justify-center items-center md:items-start">
                      <p className="text-14 text-sf-yellow-700 font-poppins">Date of redemption:</p>
                      <p className="text-14 text-sf-gray-300 font-poppins ml-4 md:ml-0">{getDateString(createdAt)}</p>
                    </div>
                    <div className="w-full h-12" />
                    <p className="text-14 text-sf-yellow-700 font-poppins text-center md:text-left">How to Claim</p>
                    <p className="text-14 text-sf-gray-300 font-poppins text-center md:text-left px-20 md:px-0 md:pr-10">
                      {claimDescription}
                    </p>
                    <div className="w-full h-20" />
                    <button
                      className="w-full bg-secondary rounded-[4px] py-10 md:px-30 text-14 text-white uppercase"
                      onClick={() => setStartClaim(true)}
                    >
                      Claim Now
                    </button>
                  </>
                )}
                <div className="w-full h-12" />
                <button
                  className="w-full bg-danger rounded-[4px] py-10 md:px-30 text-14 text-white uppercase"
                  onClick={onClose}
                >
                  OK
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  {!completeClaim ? (
                    <>
                      <div className="w-full h-32" />
                      <p className="text-14 text-sf-zinc-400 font-poppins">Claim Progress</p>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-10" />
                      <p className="text-14 text-sf-yellow-700 font-poppins text-center md:text-left">Description:</p>
                      <p className="text-14 text-sf-gray-300 font-poppins text-center md:text-left px-20 md:px-0 md:pr-10">
                        {description}
                      </p>
                      <div className="w-full h-24" />
                      <p className="text-20 text-sf-green-600 font-poppins font-bold">Claim Complete!</p>
                    </>
                  )}
                  <div className="w-full h-20" />
                  <Progressbar value={progress} className="!w-98 !h-98" />
                </div>
                <div className="w-full h-40" />
                {!completeClaim ? (
                  <>
                    <button
                      className="w-full bg-gradient-to-b from-sf-green-600 to-[#333B42] rounded-[4px] py-10 md:px-30 text-14 text-white uppercase md:px-30"
                      onPointerDown={startCounter}
                      onPointerUp={stopCounter}
                      onPointerLeave={stopCounter}
                    >
                      PRESS AND HOLD TO CLAIM
                    </button>
                    <div className="w-full h-12" />
                    <button
                      className="w-full bg-danger rounded-[4px] py-10 md:px-30 text-14 text-white uppercase"
                      onClick={() => setStartClaim(false)}
                    >
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/home">
                      <button className="w-full bg-secondary rounded-[4px] py-10 md:px-30 text-14 text-white uppercase">
                        Home
                      </button>
                    </Link>
                    <div className="w-full h-12" />
                    <button
                      className="w-full bg-danger rounded-[4px] py-10 md:px-30 text-14 text-white uppercase"
                      onClick={onClose}
                    >
                      RETURN TO MY ASSETS
                    </button>
                  </>
                )}
              </>
            )
          ) : (
            <>
              <div className="w-full h-20" />
              <p className="text-14 text-sf-yellow-700 font-poppins text-center md:text-left">Description:</p>
              <p className="text-14 text-sf-gray-300 font-poppins text-center md:text-left px-20 md:px-0 md:pr-10">
                {description}
              </p>
              <div className="w-full h-20" />
              <div className="flex md:flex-col justify-center items-center md:items-start">
                <p className="text-14 text-sf-yellow-700 font-poppins">Date of Claim:</p>
                <p className="text-14 text-sf-gray-300 font-poppins ml-4 md:ml-0">{getDateString(claimDate)}</p>
              </div>
              <div className="w-full h-34" />
              <button className="w-full bg-secondary rounded-[4px] py-10 md:px-30 text-14 text-white uppercase">
                CLAIMED
              </button>
              <div className="w-full h-20" />
              <button
                className="w-full bg-danger rounded-[4px] py-10 md:px-30 text-14 text-white uppercase"
                onClick={onClose}
              >
                Ok
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ClaimModal
