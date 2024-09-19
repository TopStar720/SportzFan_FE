import { Match, Sponsor, Team } from 'utils/types'

export enum PredictionType {
  Score = 'Score',
  WinningOutCome = 'WinningOutCome',
}

export type RewardDistribution = {
  winnerOrder: number
  rewardKudos: number
  rewardToken: number
}

export type PlayPrediction = {
  userId: string
  mainPredictScore: number
  oppositionPredictScore: number
  rank: number
  rewardKudos: number
  rewardToken: number
}

export type Prediction = {
  id: string
  team: Team
  match: Match
  title: string
  description: string
  predictionType: PredictionType
  start: string
  end: string
  sponsor: Sponsor
  eligbleKudos: number
  eligbleToken: number
  rewardKudosAll: number
  rewardDistribution: RewardDistribution[]
  playPrediction: PlayPrediction[]
  isEnded: boolean
}

export type PredictScores = {
  mainPredictScore: number | string
  oppositionPredictScore: number | string
}
