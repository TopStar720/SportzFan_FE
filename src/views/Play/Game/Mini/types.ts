import { Match, Sponsor, Team } from 'utils/types'

export enum MiniGameType {
  Soccer,
  Rugby,
  Hockey,
  Cricket,
  Baseball,
  Volleyball,
}

export type RewardDistribution = {
  winnerOrder: number
  rewardKudos: number
  rewardToken: number
}

export type PlayMiniGame = {
  userId: string
}

export type Mini = {
  id: string
  team: Team
  match: Match
  title: string
  description: string
  avatar: string
  type: MiniGameType
  start: string
  end: string
  sponsor: Sponsor
  eligbleKudos: number
  eligbleToken: number
  rewardKudosAll: number
  rewardDistribution: RewardDistribution[]
  playMiniGame: PlayMiniGame[]
  lifeCount: number
  refreshTime: number
  refreshAmount: number
  isEnded: boolean
}
