import { Match, Sponsor, Team } from 'utils/types'

export type PollOption = {
  id: string
  details: string
}

export type PollParticipants = {
  userId: string
  pollOptionId: string
}

export type Poll = {
  id: string
  team: Team
  match: Match
  title: string
  description: string
  options: PollOption[]
  start: string
  end: string
  participants: PollParticipants[]
  sponsor: Sponsor
  kudosEligible: number
  tokenEligible: number
  kudosReward: number
  tokenReward: number
  isEnded: boolean
  isPlayed: boolean
}
