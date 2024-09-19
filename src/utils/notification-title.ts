import { NotificationCategoryType, NotificationData, NotificationTypeEnum } from 'views/Notification/types'
import { TransactionType } from 'views/Wallet/types'

export const getNotificationTitle = (item: NotificationData) => {
  if (item.type === NotificationTypeEnum.Reward) {
    if (item.category === NotificationCategoryType.Asset && item.section === 'Asset')
      return `You received a bonus asset - ${item.content}`
    if (item.category === NotificationCategoryType.Challenge)
      return `Nice work! You received rewards for completing ${item.content}`
    if (item.category === NotificationCategoryType.Game)
      return `Nice work! You received rewards for playing ${item.content}`
    if (item.category === NotificationCategoryType.Poll)
      return `Nice work! You received rewards for playing ${item.content}`
    if (item.category === NotificationCategoryType.Auth && item.section === TransactionType.EarlySignUpReward)
      return `You have been rewarded as one of the first users on ${item.content}`
    if (item.category === NotificationCategoryType.Auth && item.section !== TransactionType.EarlySignUpReward)
      return `You received rewards for Filling your Profile`
  }
  if (item.type === NotificationTypeEnum.NewAsset) return `New asset added to marketplace - ${item.content}`

  if (item.type === NotificationTypeEnum.GameAlive) return `Game on! *${item.content}* is now live`
  if (item.type === NotificationTypeEnum.ChallengeAlive) return `Challenge Time! *${item.content}* is now live`
  if (item.type === NotificationTypeEnum.PollAlive) return `It's Time to Vote! *${item.content}* is now live`
  if (item.type === NotificationTypeEnum.MilestoneEligible)
    return `Milestone Unlocked! You are now eligible for the Game "${item.content}"`

  if (item.type === NotificationTypeEnum.GameEnded) return `Crunch Time! The results are in for ${item.content}`
  if (item.type === NotificationTypeEnum.PollEnded) return `Crunch Time! The results are in for ${item.content}`

  if (item.type === NotificationTypeEnum.ChallengeCompleted)
    return `Challenge complete! Nice work on completing ${item.content}`

  if (item.type === NotificationTypeEnum.Deposit) return `(${item.content}) Token added to your wallet`

  if (item.type === NotificationTypeEnum.LevelUp) return `You levelled up! You have now reached ${item.content} status.`

  if (item.type === NotificationTypeEnum.SignUp)
    return `Thanks for signing up to ${item.content}, ${item.detailContent}`
  if (item.type === NotificationTypeEnum.Transfer) {
    const token = item?.content?.split(',')[0]
    const kudos = item?.content?.split(',')[1]
    if (Number(token) > 0 && Number(kudos) > 0) {
      return `You ${
        item.category === NotificationCategoryType.TransferReceived ? 'received' : 'sent'
      } ${token} tokens, ${kudos} kudos ${
        item.category === NotificationCategoryType.TransferReceived ? 'from' : 'to'
      } ${item.section}`
    } else if (Number(token) > 0) {
      return `You  ${
        item.category === NotificationCategoryType.TransferReceived ? 'received' : 'sent'
      } ${token} tokens ${item.category === NotificationCategoryType.TransferReceived ? 'from' : 'to'} ${item.section}`
    } else if (Number(kudos) > 0) {
      return `You  ${
        item.category === NotificationCategoryType.TransferReceived ? 'received' : 'sent'
      } ${kudos} kudos ${item.category === NotificationCategoryType.TransferReceived ? 'from' : 'to'} ${item.section}`
    }
  }

  return item.content
}
