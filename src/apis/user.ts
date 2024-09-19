import api from './api'
import { TEAM_ID } from 'config'
import { UserData } from 'views/Profile/types'
import { SettingsData } from 'views/Settings'
import { LeaderboardTypeEnum } from 'views/Leaderboard/types'

const getProfile = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get('/user/profile')
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const updateProfile = (data: UserData): any => {
  return new Promise((resolve, reject) => {
    api
      .put('/user/profile-update', data)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getProfileRewardData = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/profile-reward/${TEAM_ID}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getProfileRewardStatus = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get('/profile-reward/status/preview')
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getUserBalance = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get('/user/balance')
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const updatePassword = (data: SettingsData): any => {
  return new Promise((resolve, reject) => {
    api
      .put('/user/reset-password', data)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getLeaderboard = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get('/user/leaderboard/0/10')
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getLeaderboardDetailed = (
  type: LeaderboardTypeEnum,
  skip: number = 0,
  take: number = 10,
  filterData?: any,
): any => {
  let params = `skip=${skip}&take=${take}`
  if (type === LeaderboardTypeEnum.Games && filterData) {
    params = params + `&game=${filterData.filter}`
  }
  if (type === LeaderboardTypeEnum.Weekly && filterData) {
    params = params + `&start=${filterData.start}&end=${filterData.end}`
  }
  return new Promise((resolve, reject) => {
    api
      .get(`/user/detailed-leaderboard?${params}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getReferralLink = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get('/user/get-referral-link')
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const referFriend = (email: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/user/refer/${email}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export {
  getProfile,
  updateProfile,
  getProfileRewardData,
  getProfileRewardStatus,
  getUserBalance,
  updatePassword,
  getLeaderboard,
  getLeaderboardDetailed,
  getReferralLink,
  referFriend,
}
