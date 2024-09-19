export type NotificationData = {
  id: string
  type: NotificationTypeEnum
  category: NotificationCategoryType
  section: string
  uniqueId: string
  content: string
  detailContent: string
  isSeen: boolean
  createdAt: string
}

export type MessageData = {
  userId: string
  type: string
  content: string
}

export enum NotificationTypeEnum {
  SignUp = 'SignUp',
  FirstSignIn = 'FirstSignIn',
  GameAlive = 'GameAlive',
  ChallengeAlive = 'ChallengeAlive',
  PollAlive = 'PollAlive',
  MilestoneEligible = 'MilestoneEligible',
  GameEnded = 'GameEnded',
  PollEnded = 'PollEnded',
  ChallengeCompleted = 'ChallengeCompleted',
  Reward = 'Reward',
  Deposit = 'Deposit',
  LevelUp = 'LevelUp',
  NewAsset = 'NewAsset',
  Transfer = 'Transfer',
}

export enum NotificationCategoryType {
  Auth = 'Auth',
  Game = 'Game',
  Challenge = 'Challenge',
  Poll = 'Poll',
  Asset = 'Asset',
  TokenDeposit = 'TokenDeposit',
  LevelUp = 'LevelUp',
  TransferReceived = 'TransferReceived',
  TransferSent = 'TransferSent',
}
