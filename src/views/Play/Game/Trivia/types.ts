import { Match, Sponsor, Team } from 'utils/types'

export enum TriviaType {
  MultiChoiceSingleAnswer = 'MultiChoiceSingleAnswer',
  WhoAmI = 'WhoAmI',
}

export type RewardDistribution = {
  winnerOrder: number
  rewardKudos: number
  rewardToken: number
}

export type PlayTrivia = {
  userId: string
  score: string
  takenTime: number
  rank: number
  isSent: false
  rewardKudos: number
  rewardToken: number
}

export type TriviaQuationOption = {
  id: string
  optionText: string
}

export type TriviaQuation = {
  id: string
  question: string
  options: TriviaQuationOption[]
}

export type Trivia = {
  id: string
  team: Team
  match: Match
  title: string
  description: string
  triviaType: TriviaType
  start: string
  end: string
  sponsor: Sponsor
  eligbleKudos: number
  eligbleToken: number
  rewardKudosAll: number
  rewardDistribution: RewardDistribution[]
  playTrivia: PlayTrivia[]
  triviaQuestions: TriviaQuation[]
  isEnded: boolean
  totalCount?: number
}

export type TriviaAnswer = {
  questionId: string
  optionId: string
}
