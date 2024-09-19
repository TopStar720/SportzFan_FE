import api from './api'

const getActivityList = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get('/transaction/activity/list')
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

export { getActivityList }
