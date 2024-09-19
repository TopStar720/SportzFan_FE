export enum LeaderboardTypeEnum {
  Season,
  Weekly,
  Games,
}

export type LeaderboardData = {
  rank: string
  old_rank: string
  avatar: string
  first_name: string
  last_name: string
  kudos_amount: number
  token_amount: number
  kudos_to_tire1: number
  kudos_to_tire2: number
  kudos_to_tire3: number
  kudos_to_tire4: number
  member_level_name1: string
  member_level_name2: string
  member_level_name3: string
  member_level_name4: string
}
