import api from './api'
import { TEAM_ID } from 'config'

const getTeam = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/team/${TEAM_ID}`)
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

export { getTeam }
