import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import PredictSuccessModal from 'views/Notification/components/PredictSuccessModal'
import MileStoneEligibleModal from 'views/Notification/components/MileStoneEligibleModal'
import MileStoneSuccessModal from 'views/Notification/components/MileStoneSuccessModal'
import ChallengeSuccessModal from 'views/Notification/components/ChallengeSuccessModal'
import RewardModal from 'views/Notification/components/RewardModal'
import { NotificationIcon } from './Icons'
import { classNames, getDateString } from 'utils'
import { NotificationCategoryType, NotificationData, NotificationTypeEnum } from 'views/Notification/types'
import { useAppDispatch, useAppSelector } from 'hooks'
import { openNotification } from 'store/notifications'
import GameAliveModal from 'views/Notification/components/GameAliveModal'
import ChallengeAliveModal from 'views/Notification/components/ChallengeAliveModal'
import PollAliveModal from 'views/Notification/components/PollAliveModal'
import { getNotificationDetail } from 'apis/notification'
import { GameTypeEnum } from 'views/Play/types'
import WelcomeModal from 'views/Notification/components/WelcomeModal'
import PollResultModal from 'views/Notification/components/PollResultModal'
import CongratesModal from 'views/Notification/components/CongratesModal'
import LevelUpModal from 'views/Notification/components/LevelUpModal'
import { TransactionType } from 'views/Wallet/types'
import { getNotificationTitle } from 'utils/notification-title'
import TransferSuccessModal from 'views/Notification/components/TransferSuccessModal'

interface NotificationProps {
  content: number
  disabled: boolean
}

const Notification = ({ content, disabled }: NotificationProps) => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications).data?.slice(0, 5)
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

  return disabled ? (
    <button className="relative fit-content">
      <NotificationIcon />
      <span className={content === 0 ? 'hidden' : `notification-badge`}>{content}</span>
    </button>
  ) : (
    <>
      <Popover className="relative flex">
        {({ open, close }) => (
          <>
            <Popover.Button className="relative fit-content">
              <NotificationIcon />
              <span className={content === 0 ? 'hidden' : `notification-badge`}>{content}</span>
            </Popover.Button>
            {open ? (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -right-196 z-20 mt-44 -translate-x-1/2 transform">
                  <div className="overflow-hidden">
                    <div className="border border-sf-zinc-600 bg-dark rounded-[4px] shadow-lg px-14 pt-12 pb-24">
                      {notifications.map((item: any) => (
                        <button
                          key={`notification-item-${item.id}`}
                          className={classNames(
                            'w-332 flex items-center border-b border-sf-neutral-500/10 py-4 text-left',
                            !item.isSeen ? 'bg-sf-yellow-500/10' : '',
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
                                  : item.type === NotificationTypeEnum.Reward &&
                                    item.category === NotificationCategoryType.Auth
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
                          <div className="w-256 -ml-6 py-8">
                            <p className="text-12 leading-14 text-white/80">{getNotificationTitle(item)}</p>
                            <p className="text-10 leading-12 text-sf-yellow-700 mt-4">
                              {getDateString(item.createdAt)}
                            </p>
                          </div>
                        </button>
                      ))}
                      <div className="flex justify-center mt-20">
                        <Link href="/notification/all">
                          <button className="text-14 text-sf-rose-700 leading-18" onClick={() => close()}>
                            See All Notifications
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            ) : null}
          </>
        )}
      </Popover>
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
    </>
  )
}

export default Notification
