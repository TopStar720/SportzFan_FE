import api from './api'
import { TEAM_ID } from 'config'

const getTeamTransaction = (skip = 0, take = 5): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/transaction/list/${TEAM_ID}?skip=${skip}&take=${take}`)
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

const getUserTransaction = (skip = 0, take = 5): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/transaction/list/user-self/${TEAM_ID}?skip=${skip}&take=${take}`)
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

const getTransaction = (id:string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/transaction/${id}`)
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

export { getTeamTransaction, getUserTransaction, getTransaction }
