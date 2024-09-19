export enum ActivityType {
  EarlySignUpReward = 'EarlySignUpReward',
  Prediction = 'Prediction',
  Trivia = 'Trivia',
  MilestoneReward = 'MilestoneReward',
  CheckIn = 'CheckIn',
  MultiCheckIn = 'MultiCheckIn',
  Poll = 'Poll',
  Asset = 'Asset',
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

export type ActivityData = {
  id: string
  type: ActivityType
  kudosamount: number
  tokenamount: number
  createdAt: string
}
