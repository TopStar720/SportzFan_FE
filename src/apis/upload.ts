import api from './api'

const uploadFile = (path: string, data: any): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/upload/${path}`, data)
      .then((res) => {
        if (res.status === 201) {
          resolve(res.data?.url)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { uploadFile }
