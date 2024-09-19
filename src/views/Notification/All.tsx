import { Fragment, useCallback, useEffect, useState } from 'react'
import ChallengeSuccessModal from './components/ChallengeSuccessModal'
import PredictSuccessModal from './components/PredictSuccessModal'
import MileStoneEligibleModal from './components/MileStoneEligibleModal'
import MileStoneSuccessModal from './components/MileStoneSuccessModal'
import RewardModal from './components/RewardModal'
import { classNames, getDateString } from 'utils'
import { NotificationCategoryType, NotificationData, NotificationTypeEnum } from './types'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getNotifications, openNotification } from 'store/notifications'
import { getNotificationDetail } from 'apis/notification'
import GameAliveModal from './components/GameAliveModal'
import ChallengeAliveModal from './components/ChallengeAliveModal'
import PollAliveModal from './components/PollAliveModal'
import { GameTypeEnum } from 'views/Play/types'
import WelcomeModal from './components/WelcomeModal'
import PollResultModal from './components/PollResultModal'
import CongratesModal from './components/CongratesModal'
import LevelUpModal from './components/LevelUpModal'
import { getNotificationTitle } from 'utils/notification-title'
import TransferSuccessModal from './components/TransferSuccessModal'
import NotificationDeleteModal from './components/NotificationDeleteModal'

const Notifications = () => {
  const { data, teamData } = useAppSelector((state) => state.user)

  const [itemData, setItemData] = useState({})
  const [game, setGame] = useState({})
  const [challenge, setChallenge] = useState({})
  const [poll, setPoll] = useState({})
  const [asset, setAsset] = useState({})
  const [tier, setTier] = useState({})
  const [transferData, setTransferData] = useState({})
  const [showWelcomModal, setShowWelcomeModal] = useState<boolean>(false)
  const [showCongratesModal, setShowCongratesModal] = useState<boolean>(false)
  const [showGameAliveModal, setShowGameAliveModal] = useState<boolean>(false)
  const [showChallengeAliveModal, setShowChallengeAliveModal] = useState<boolean>(false)
  const [showPollAliveModal, setShowPollAliveModal] = useState<boolean>(false)
  const [showPredictSuccessModal, setShowPredictSuccessModal] = useState<boolean>(false)
  const [showMileStoneEligibleModal, setShowMileStoneEligibleModal] = useState<boolean>(false)
  const [showMileStoneSuccessModal, setShowMileStoneSuccessModal] = useState<boolean>(false)
  const [showChallengeSuccessModal, setShowChallengeSuccessModal] = useState<boolean>(false)
  const [showPollResultModal, setShowPollResultModal] = useState<boolean>(false)
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false)
  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false)
  const [showTransferSuccessModal, setShowTransferSuccessModal] = useState<boolean>(false)
  const [showNotiDeleteModal, setShowNotiDeleteModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const notifications = useAppSelector((state) => state.notifications).data
  const totalCount = useAppSelector((state) => state.notifications).totalCount

  // pagination options.
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleViewMore = async () => {
    dispatch(getNotifications({ skip: notifications.length, take: rowsPerPage }))
  }

  const handleOpen = async (item: NotificationData) => {
    try {
      if (!item.isSeen) {
        dispatch(openNotification({ id: item.id }))
      }

      setItemData(item)

      const notificationDetail = await getNotificationDetail(item)
      const temp = { ...notificationDetail }
      temp.section = item.section

      switch (item.type) {
        case NotificationTypeEnum.GameAlive:
          setGame(temp)
          setShowGameAliveModal(true)

          break
        case NotificationTypeEnum.ChallengeAlive:
          setChallenge(temp)
          setShowChallengeAliveModal(true)
          break
        case NotificationTypeEnum.PollAlive:
          setPoll(temp)
          setShowPollAliveModal(true)
          break
        case NotificationTypeEnum.GameEnded:
          setGame(temp)
          if (temp.section === GameTypeEnum.Milestone) {
            setShowMileStoneSuccessModal(true)
          } else {
            setShowPredictSuccessModal(true)
          }
          break
        case NotificationTypeEnum.MilestoneEligible:
          setGame(temp?.milestone || {})
          setShowMileStoneEligibleModal(true)
          break
        case NotificationTypeEnum.ChallengeCompleted:
          temp.detailContent = item.detailContent
          setChallenge(temp)
          setShowChallengeSuccessModal(true)
          break
        case NotificationTypeEnum.PollEnded:
          setPoll(temp)
          setShowPollResultModal(true)
          break
        case NotificationTypeEnum.Reward:
          if (item.category === NotificationCategoryType.Asset) {
            temp.detailContent = item.detailContent
            setAsset(temp)
            setShowRewardModal(true)
          }
          if (item.category === NotificationCategoryType.Auth) {
            setShowCongratesModal(true)
          }

          if (item.section === GameTypeEnum.Predict || item.section === GameTypeEnum.Trivia) {
            setGame(temp)
            setShowPredictSuccessModal(true)
          }

          if (item.section === GameTypeEnum.Milestone) {
            setGame(temp?.milestone || {})
            setShowMileStoneSuccessModal(true)
          }

          if (item.category === NotificationCategoryType.Challenge) {
            setChallenge(temp)
            setShowChallengeSuccessModal(true)
          }

          if (item.category === NotificationCategoryType.Poll) {
            setPoll(temp)
            setShowPollResultModal(true)
          }

          break
        case NotificationTypeEnum.Transfer:
          setTransferData(item)
          setShowTransferSuccessModal(true)
          break

        case NotificationTypeEnum.SignUp:
          setShowWelcomeModal(true)
          break
        case NotificationTypeEnum.LevelUp:
          setTier(item)
          setShowLevelUpModal(true)
          break
      }
    } catch (err) {}
  }

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <p className="text-24 leading-30 text-sf-gray-300 font-bold">Notifications</p>
        {notifications.length > 0 && (
          <button className="text-sf-rose-700 text-14" onClick={() => setShowNotiDeleteModal(true)}>
            Clear All
          </button>
        )}
      </div>
      <div className="w-full h-10" />
      {notifications.map((item: any, idx) => (
        <button
          key={`notification-item-${item.id}`}
          className={classNames(
            'w-full flex items-center border border-sf-zinc-600 rounded-[4px] text-left mb-10',
            item.isSeen ? 'bg-dark' : 'bg-info',
          )}
          onClick={() => {
            handleOpen(item)
          }}
        >
          <div className="w-60 h-60 flex justify-center items-center bg-[url('/assets/images/shine-yellow.svg')] bg-cover">
            <img
              src={`/assets/images/${
                item.category === NotificationCategoryType.Game
                  ? 'balls'
                  : item.category === NotificationCategoryType.Challenge
                  ? 'check-in'
                  : item.category === NotificationCategoryType.Poll
                  ? 'chart'
                  : item.category === NotificationCategoryType.Asset
                  ? 't-shirt'
                  : item.type === NotificationTypeEnum.Reward && item.category === NotificationCategoryType.Auth
                  ? 'like'
                  : item.category === NotificationCategoryType.LevelUp
                  ? 'trophy'
                  : item.type === NotificationTypeEnum.Transfer
                  ? 'hand-coin'
                  : 'note'
              }-yellow.svg`}
              alt=""
              className="h-26"
            />
          </div>
          <div className="sm:-ml-6 w-[calc(100%-60px)] py-10 pr-10">
            <p className="text-12 leading-14 text-white/80">{getNotificationTitle(item)}</p>
            <p className="text-10 leading-12 text-sf-yellow-700 mt-4">{getDateString(item.createdAt)}</p>
          </div>
        </button>
      ))}
      <button
        disabled={notifications.length >= totalCount}
        onClick={() => handleViewMore()}
        className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8"
      >
        <span className="text-14 text-white uppercase leading-18">View More</span>
      </button>
      <WelcomeModal show={showWelcomModal} onClose={() => setShowWelcomeModal(false)} />
      <CongratesModal show={showCongratesModal} detail={itemData} onClose={() => setShowCongratesModal(false)} />
      <GameAliveModal show={showGameAliveModal} detail={game} onClose={() => setShowGameAliveModal(false)} />
      <ChallengeAliveModal
        show={showChallengeAliveModal}
        detail={challenge}
        onClose={() => setShowChallengeAliveModal(false)}
      />
      <PollAliveModal show={showPollAliveModal} detail={poll} onClose={() => setShowPollAliveModal(false)} />
      <PredictSuccessModal
        show={showPredictSuccessModal}
        detail={game}
        onClose={() => setShowPredictSuccessModal(false)}
      />
      <MileStoneEligibleModal
        show={showMileStoneEligibleModal}
        detail={game}
        onClose={() => setShowMileStoneEligibleModal(false)}
      />
      <MileStoneSuccessModal
        show={showMileStoneSuccessModal}
        detail={game}
        onClose={() => setShowMileStoneSuccessModal(false)}
      />
      <ChallengeSuccessModal
        show={showChallengeSuccessModal}
        detail={challenge}
        onClose={() => setShowChallengeSuccessModal(false)}
      />
      <PollResultModal show={showPollResultModal} detail={poll} onClose={() => setShowPollResultModal(false)} />
      <RewardModal show={showRewardModal} detail={asset} onClose={() => setShowRewardModal(false)} />
      <LevelUpModal show={showLevelUpModal} detail={tier} onClose={() => setShowLevelUpModal(false)} />
      <TransferSuccessModal
        show={showTransferSuccessModal}
        detail={transferData}
        onClose={() => setShowTransferSuccessModal(false)}
      />
      <NotificationDeleteModal show={showNotiDeleteModal} onClose={() => setShowNotiDeleteModal(false)} />
    </Fragment>
  )
}

export default Notifications
