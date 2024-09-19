import api from './api'
import { TEAM_ID } from 'config'

const getPollList = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/poll/list?isDraft=false&search=${TEAM_ID}`)
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

const getPollsByPagination = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/poll/list?skip=${skip}&take=${take}&isDraft=false&search=${TEAM_ID}`)
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

const getPoll = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/poll/${id}`)
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

const checkPlayStatusPoll = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/poll/vote/check/${id}`)
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

const getPollResult = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/poll/my-result/${id}`)
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

const participatePoll = (id: string, pollOptionId: string): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/poll/${id}/participate`, { pollOptionId })
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

const getMyPollList = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/poll/my-list?skip=${skip}&take=${take}&search=${TEAM_ID}`)
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
  getPollList,
  getPollsByPagination,
  getPoll,
  checkPlayStatusPoll,
  getPollResult,
  participatePoll,
  getMyPollList,
}
