import { Match, Sponsor, Team } from 'utils/types'

export type PlayMilestone = {
  userId: string
  checkInFlag: boolean
  balanceFlag: boolean
}

export type Milestone = {
  id: string
  team: Team
  match: Match
  title: string
  description: string
  start: string
  end: string
  sponsor: Sponsor
  eligbleKudos: number
  eligbleToken: number
  rewardKudosPerPlayer: number
  rewardTokenPerPlayer: number
  isEnded: boolean
}
