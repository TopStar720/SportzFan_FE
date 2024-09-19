import api from './api'
import { TEAM_ID } from 'config'

const getUpcomingMatchList = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/match?filter=Upcoming&search=${TEAM_ID}`)
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

const getMatchData = (
  id: string,
  showGame: boolean = true,
  showChallenge: boolean = true,
  showPoll: boolean = true,
): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/match/${id}?showGame=${showGame}&showChallenge=${showChallenge}&showPoll=${showPoll}`)
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

const getUpcomingMatchesByPagination = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/match?skip=${skip}&take=${take}&filter=Upcoming&search=${TEAM_ID}`)
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

export { getUpcomingMatchList, getMatchData, getUpcomingMatchesByPagination }
