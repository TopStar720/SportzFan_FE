import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import BuyModal from './BuyModal'
import { setLoading } from 'store/app'
import { useAppDispatch } from '../../hooks'
import { getDateTimeString } from '../../utils'
import { getUserBalance } from '../../apis/user'
import { getUserTransaction } from '../../apis/transaction'
import { IconList, PaginatorDto, TransactionData, TransactionType, UserBalanceData } from './types'

const Wallet = () => {
  const dispatch = useAppDispatch()

  const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
  const [userBalance, setUserBalance] = useState<UserBalanceData>()
  const [totalCount, setTotalCount] = useState(0)
  const [transactions, setTransactions] = useState([])

  // pagination options.
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const fetchDataByPagination = useCallback(async () => {
    const skip = page * rowsPerPage
    dispatch(setLoading(true))
    getUserTransaction(skip, rowsPerPage).then((data: PaginatorDto<TransactionData>) => {
      setTotalCount(data.count || 0)
      let temp = [...transactions]
      temp = temp.concat(data.data || [])
      setTransactions(temp)
      dispatch(setLoading(false))
    })
  }, [dispatch, page, rowsPerPage])

  const changePageNum = (direct: number) => {
    const maxPageNum = Math.floor(totalCount / rowsPerPage)
    if (page === 0 && direct === -1) return
    if (page === maxPageNum && direct === 1) return

    setPage((prevState) => prevState + direct)
  }

  const loadBalanceData = useCallback(() => {
    dispatch(setLoading(true))
    getUserBalance().then((balance: UserBalanceData) => {
      setUserBalance(balance)
      dispatch(setLoading(false))
    })
  }, [])

  const getDescription = useCallback((trans: TransactionData) => {
    let description,
      matchDate = ''
    switch (trans.type) {
      case TransactionType.Deposit:
        description = 'Tokens Added to Wallet'
        break
      case TransactionType.TriviaReward:
        description = `Trivia: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.PredictionReward:
        description = `Predict the Score: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.MilestoneReward:
        description = `Milestone: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.CheckInReward:
        description = `Check-In: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.MultiCheckInReward:
        description = `Multi-Check-In: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.MultiReferrerReward:
        description = `Multi-Referrer for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.SurveyReward:
        description = `Survey: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.PollReward:
        description = `Poll for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.AssetReward:
        description = `Asset for ${trans.uniqueId}`
        break
      case TransactionType.TriviaEligible:
        description = `Trivia: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.PredictionEligible:
        description = `Predict the Score: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.MilestoneEligible:
        description = `Milestone: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.CheckInEligible:
        description = `Check-In: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.MultiCheckInEligible:
        description = `Multi-Check-In: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.MultiReferrerEligible:
        description = `Multi-Referrer for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.SurveyEligible:
        description = `Survey: ${trans.match?.title || 'Game'}`
        matchDate = getDateTimeString(trans.match?.start)
        break
      case TransactionType.PollEligible:
        description = `Poll for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.AssetEligible:
        description = `Asset for ${trans.uniqueId}`
        break
      case TransactionType.EarlySignUpReward:
        description = `Early SignUp for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardLastName:
        description = `LastName fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardBirthday:
        description = `Birthday fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardGender:
        description = `Gender fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardEmail:
        description = `Email fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardPhone:
        description = `Phone fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardLocationCountry:
        description = `Country fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardLocationState:
        description = `State fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardLocationCity:
        description = `City fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardFavPlayer:
        description = `Favourite Player fill  for ${trans.team?.name || 'Team'}`
        break
      case TransactionType.ProfileRewardFantype:
        description = `Fan Type fill  for ${trans.team?.name || 'Team'}`
        break
      default:
        description = 'Tokens Added to Wallet'
        break
    }
    return [description, matchDate]
  }, [])

  useEffect(() => {
    loadBalanceData()
    fetchDataByPagination()
  }, [loadBalanceData, fetchDataByPagination])

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row justify-between items-center bg-info border border-sf-zinc-600 rounded-[4px] relative overflow-hidden px-40 pt-20 pb-20 md:pb-0">
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/bg-with-spiral-curves.png')] bg-cover" />
        <div className="flex">
          <div className="relative min-w-114">
            <img src="/assets/images/token-container-small.png" alt="" className="w-114" />
            <div className="absolute inset-0 w-full h-full">
              <img src="/assets/images/token.svg" alt="Token" className="w-60 mx-auto mt-14" />
            </div>
            <div className="absolute inset-0 w-full h-full">
              <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-80 mx-auto" />
            </div>
          </div>
          <div className="ml-22 mt-4">
            <div className="drop-shadow-[0_0_12px_rgba(204,37,71,1)]">
              <p className="token-name text-12 leading-20">Available Token Balance</p>
              <p className="token-value font-bold text-34 leading-42">
                {parseFloat(`${userBalance?.tokenAmount}`) || 0}
              </p>
            </div>
            <p className="text-12 leading-20 text-sf-zinc-400 font-poppins">{userBalance?.symbol || 'AG'} Token</p>
          </div>
        </div>
        <div className="relative flex flex-col md:flex-row items-start md:-mt-12">
          <span className="text-14 leading-20 text-sf-zinc-400 font-poppins">
            1 Token = A$ {parseFloat(userBalance?.price || '0')}
          </span>
          <div className="flex mt-14 md:mt-0">
            <div className="flex flex-col items-center">
              <button
                disabled
                className="w-140 md:w-80 h-40 md:h-30 bg-secondary rounded-[4px] text-12 text-white uppercase md:ml-8"
                onClick={() => setShowBuyModal(true)}
              >
                Buy
              </button>
              <span className="text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">Coming soon</span>
            </div>
            <Link href="/marketplace">
              <button className="w-140 md:w-80 h-40 md:h-30 bg-danger rounded-[4px] text-12 text-white uppercase ml-14">
                Redeem
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-20" />
      <p className="text-12 leading-14 text-sf-zinc-400 uppercase">Transactions</p>
      <div className="w-full h-10" />
      {(transactions || []).map((trans, index) => (
        <div
          key={index}
          className="w-full md:flex justify-between items-center bg-dark border border-sf-zinc-600 rounded-[4px] mb-10 p-6"
        >
          <div className="flex items-center">
            <div className="min-w-68 w-68 h-68 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
              <img src={IconList[trans.type] || '/assets/images/wallet-yellow.svg'} alt="" className="h-28" />
            </div>
            <div>
              <span className="text-16 leading-20 text-sf-gray-300 ml-">{getDescription(trans)[0]}</span>
              {getDescription(trans)[1] && (
                <div className="flex">
                  <span className="text-10 leading-16 text-sf-zinc-400 font-poppins">Match Date/Time :</span>
                  <span className="text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">
                    {getDescription(trans)[1]}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row-reverse md:flex-col justify-between items-end px-14 md:px-26 pb-6 md:pb-0">
            <div className="flex">
              <img src="/assets/images/token.svg" alt="" className="w-16" />
              <span
                className={
                  'text-20 leading-24 ml-4 ' +
                  (trans.receiver.email === userBalance.email ? 'text-sf-green-500' : 'text-sf-red-600')
                }
              >
                {' '}
                {trans.receiver.email === userBalance.email ? ' +' : ' -'}
                {trans.tokenAmount}
              </span>
            </div>
            <div className="flex">
              <span className="text-10 leading-16 text-sf-zinc-400 font-poppins">Transaction Date:</span>
              <span className="text-10 leading-16 text-sf-yellow-700 font-poppins ml-6">
                {getDateTimeString(trans?.createdAt || '22 May 2022, 2:45 PM')}
              </span>
            </div>
          </div>
        </div>
      ))}
      <button
        disabled={(page + 1) * rowsPerPage >= totalCount}
        onClick={() => changePageNum(1)}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
      <BuyModal
        show={showBuyModal}
        price={parseFloat(userBalance?.price || '0')}
        onClose={() => setShowBuyModal(false)}
      />
    </Fragment>
  )
}

export default Wallet
