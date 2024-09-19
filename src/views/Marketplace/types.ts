type Team = {
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
}

type Sponsor = {
  id: string
  title: string
  description: string
  team: Team
  logo: string
}

export enum AssetType {
  Team = 'Team Asset',
  Sponsor = 'Sponsor Asset',
}

export enum AssetCategory {
  Merchandise = 'Merchandise',
  VIPPass = 'VIP Pass',
  Tickets = 'Tickets',
  ExclusiveContent = 'Exclusive Content',
  InGameAsset = 'In game asset',
  DigitalCollectible = 'Digital collectible',
}

export enum ClaimType {
  Physical = 'Physical-claim in store/ at merchant',
  Digital = 'Digital-claim online',
}

export enum NotifyType {
  token = 'token',
  kudos = 'kudos',
}

export type AssetCoupon = {
  id: string
  userId: string
  code: string
}

export type Asset = {
  id: string
  type: AssetType
  title: string
  description: string
  imageUrl: string
  start: string
  end: string
  tokenRequired: number
  kudosEligible: number
  claimType: ClaimType
  claimDescription: string
  team?: Team
  sponsor?: Sponsor
  category?: AssetCategory
  totalCount?: number
  purchaseCount?: number
  claimUrl?: string
  coupons: AssetCoupon[]
}

export type MyAsset = {
  id: string
  userId: string
  assetId: string
  couponId?: string
  asset: Asset
  createdAt: string
  claimDate: string
}
