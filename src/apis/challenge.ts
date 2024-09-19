import api from './api'
import { TEAM_ID } from 'config'

const getChallengeList = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/list?isDraft=false&search=${TEAM_ID}`)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data?.data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getChallengeByPagination = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/list?skip=${skip}&take=${take}&isDraft=false&search=${TEAM_ID}`)
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

const getChallengeCheckIn = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/check-in/${id}`)
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

const getPlayCheckIn = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/check-in/play/${id}`)
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

const getTwoDistance = (data: { lat1: number; lng1: number; lat2: number; lng2: number }) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/challenge/check-in/distance`, data)
      .then((res) => {
        if (res.status === 201) {
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

const playCheckIn = (data: { checkInId: string; location: number; userCoordinates: string }) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/challenge/check-in/play`, data)
      .then((res) => {
        if (res.status === 201) {
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

const getChallengeSurvey = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/survey/${id}`)
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

const getPlaySurvey = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/survey/play/${id}`)
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

const playSurvey = (data: { surveyId: string; answer: any }) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/challenge/survey/play`, data)
      .then((res) => {
        if (res.status === 201) {
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

const getMyChallengeList = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/challenge/my-list?skip=${skip}&take=${take}`)
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
  getChallengeList,
  getChallengeByPagination,
  getChallengeCheckIn,
  getPlayCheckIn,
  getTwoDistance,
  playCheckIn,
  getChallengeSurvey,
  getPlaySurvey,
  playSurvey,
  getMyChallengeList,
}
