import { UserData } from '../Profile/types'
import { TeamData } from '../../store/types'
import { MatchData } from '../Match/types'

export enum TransactionType {
  Deposit = 'Deposit',
  TriviaReward = 'TriviaReward',
  PredictionReward = 'PredictionReward',
  MilestoneReward = 'MilestoneReward',
  CheckInReward = 'CheckInReward',
  MultiCheckInReward = 'MultiCheckInReward',
  MultiReferrerReward = 'MultiReferrerReward',
  SurveyReward = 'SurveyReward',
  PollReward = 'PollReward',
  AssetReward = 'AssetReward',
  TriviaEligible = 'TriviaEligible',
  PredictionEligible = 'PredictionEligible',
  MilestoneEligible = 'MilestoneEligible',
  CheckInEligible = 'CheckInEligible',
  MultiCheckInEligible = 'MultiCheckInEligible',
  MultiReferrerEligible = 'MultiReferrerEligible',
  SurveyEligible = 'SurveyEligible',
  PollEligible = 'PollEligible',
  AssetEligible = 'AssetEligible',
  EarlySignUpReward = 'EarlySignUpReward',
  ProfileRewardLastName = 'ProfileRewardLastName',
  ProfileRewardBirthday = 'ProfileRewardBirthday',
  ProfileRewardGender = 'ProfileRewardGender',
  ProfileRewardEmail = 'ProfileRewardEmail',
  ProfileRewardPhone = 'ProfileRewardPhone',
  ProfileRewardLocationCountry = 'ProfileRewardLocationCountry',
  ProfileRewardLocationState = 'ProfileRewardLocationState',
  ProfileRewardLocationCity = 'ProfileRewardLocationCity',
  ProfileRewardFavPlayer = 'ProfileRewardFavPlayer',
  ProfileRewardFantype = 'ProfileRewardFantype',
}

export const IconList = {
  Deposit: '/assets/images/wallet-yellow.svg',
  TriviaReward: '/assets/images/hand-coin-yellow.svg',
  PredictionReward: '/assets/images/hand-index-yellow.svg',
  MilestoneReward: '/assets/images/hand-coin-yellow.svg',
  CheckInReward: '/assets/images/hand-index-yellow.svg',
  MultiCheckInReward: '/assets/images/hand-index-yellow.svg',
  MultiReferrerReward: '/assets/images/hand-index-yellow.svg',
  SurveyReward: '/assets/images/hand-index-yellow.svg',
  PollReward: '/assets/images/hand-index-yellow.svg',
  AssetReward: '/assets/images/t-shirt-yellow.svg',
  TriviaEligible: '/assets/images/hand-coin-yellow.svg',
  PredictionEligible: '/assets/images/hand-coin-yellow.svg',
  MilestoneEligible: '/assets/images/hand-coin-yellow.svg',
  CheckInEligible: '/assets/images/hand-coin-yellow.svg',
  MultiCheckInEligible: '/assets/images/hand-coin-yellow.svg',
  MultiReferrerEligible: '/assets/images/hand-coin-yellow.svg',
  SurveyEligible: '/assets/images/hand-coin-yellow.svg',
  PollEligible: '/assets/images/hand-coin-yellow.svg',
  AssetEligible: '/assets/images/hand-coin-yellow.svg',
  ProfileRewardLastName: '/assets/images/hand-index-yellow.svg',
  ProfileRewardBirthday: '/assets/images/hand-index-yellow.svg',
  ProfileRewardGender: '/assets/images/hand-index-yellow.svg',
  ProfileRewardEmail: '/assets/images/hand-index-yellow.svg',
  ProfileRewardPhone: '/assets/images/hand-index-yellow.svg',
  ProfileRewardLocationCountry: '/assets/images/hand-index-yellow.svg',
  ProfileRewardLocationState: '/assets/images/hand-index-yellow.svg',
  ProfileRewardLocationCity: '/assets/images/hand-index-yellow.svg',
  ProfileRewardFavPlayer: '/assets/images/hand-index-yellow.svg',
  ProfileRewardFantype: '/assets/images/hand-index-yellow.svg',
  EarlySignUpReward: '/assets/images/hand-coin-yellow.svg',
}

export enum TransactionStatus {
  Pending = 'Pending',
  Failed = 'Failed',
  Success = 'Success',
}

export type UserBalanceData = {
  teamName: string
  email: string
  kudosAmount: number
  tokenAmount: number
  price: string
  symbol: string
}

export type TransactionData = {
  sender: UserData
  receiver: UserData
  team: TeamData
  match: MatchData
  type: TransactionType
  uniqueId: string
  kudosAmount: number
  tokenAmount: number
  status: TransactionStatus
  isActivated: boolean
  createdAt: string
  updatedAt: string
}

export class PaginatorDto<T> {
  data: T[]
  count: number
}
