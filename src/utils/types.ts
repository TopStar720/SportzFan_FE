export type Team = {
  id: string
  name: string
  logo: string
  price: number
  kudosToTire1: number
  kudosToTire2: number
  kudosToTire3: number
  kudosToTire4: number
  memberLevelName1: string
  memberLevelName2: string
  memberLevelName3: string
  memberLevelName4: string
  backgroundTheme: string
  primaryColor: string
  secondaryColor: string
  thirdColor: string
}

export type Sponsor = {
  id: string
  title: string
  description: string
  team: Team
  logo: string
}

export type Match = {
  id: string
  title: string
  homeTeam: Team
  awayTeam: Team
  start: string
}
