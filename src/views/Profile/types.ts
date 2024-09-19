export type UserData = {
  id?: string
  email: string
  avatar: string
  userName: string
  firstName: string
  lastName: string
  tokenId?: string
  stripeCustomerId?: string
  birthday: string
  phone: string
  gender: string
  locationCountry: string
  locationState: string
  locationCity: string
  locationPostcode: string
  favPlayer: string
  fanType: string
  kudosAmount?: number
  tokenAmount?: number
}

export type RewardData = {
  birthdayFieldKudosAmount: number
  birthdayFieldTokenAmount: number
  emailFieldKudosAmount: number
  emailFieldTokenAmount: number
  fanTypeFieldKudosAmount: number
  fanTypeFieldTokenAmount: number
  favPlayerFieldKudosAmount: number
  favPlayerFieldTokenAmount: number
  genderFieldKudosAmount: number
  genderFieldTokenAmount: number
  lastNameFieldKudosAmount: number
  lastNameFieldTokenAmount: number
  locationCityFieldKudosAmount: number
  locationCityFieldTokenAmount: number
  locationCountryFieldKudosAmount: number
  locationCountryFieldTokenAmount: number
  locationStateFieldKudosAmount: number
  locationStateFieldTokenAmount: number
  phoneFieldKudosAmount: number
  phoneFieldTokenAmount: number
}

export type RewardStatusData = {
  birthdayFieldFilled: boolean
  emailFieldFilled: boolean
  fanTypeFieldFilled: boolean
  favPlayerFieldFilled: boolean
  genderFieldFilled: boolean
  lastNameFieldFilled: boolean
  locationCityFieldFilled: boolean
  locationCountryFieldFilled: boolean
  locationStateFieldFilled: boolean
  phoneFieldFilled: boolean
}
