import { MatchData } from 'views/Match/types'

export enum GameTypeEnum {
  Predict = 'Prediction',
  Trivia = 'Trivia',
  Milestone = 'Milestone',
  MiniGame = 'MiniGame',
}

export enum ChallengeTypeEnum {
  Survey = 'Survey',
  CheckIn = 'CheckIn',
  MultiCheckIn = 'MultiCheckIn',
  MultiReferrer = 'MultiReferrer',
}

export enum PollTypeEnum {
  Normal,
  Special,
}

export enum StatusEnum {
  Live,
  Upcoming,
  Ended,
}

export type TeamData = {
  name: string
}

export type GameData = {
  id: string
  title: string
  description?: string
  type: string
  start: string
  end: string
  match_title?: string
  match_home_team_logo?: string
  match_home_team_name?: string
  match_home_team_description?: string
  match_away_team_name?: string
  match_away_team_logo?: string
  match_away_team_description?: string
  team_name?: string
  team_logo?: string
  team_description?: string
  kudos_reward_amount?: number
  token_reward_amount?: number
  is_ended: boolean
  isPlayed: boolean
}

export type ChallengeData = {
  id: string
  title: string
  description?: string
  type: string
  start: string
  end: string
  match_title?: string
  match_home_team_logo?: string
  match_home_team_name?: string
  match_home_team_description?: string
  match_away_team_name?: string
  match_away_team_logo?: string
  match_away_team_description?: string
  team_name?: string
  team_logo?: string
  team_description?: string
  kudos_reward_amount?: number
  token_reward_amount?: number
  isPlayed?: boolean
}
