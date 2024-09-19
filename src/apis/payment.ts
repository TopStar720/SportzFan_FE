import api from './api'

const createPayment = (data): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/payment/pay-with-card`, data)
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

const verifyPayment = (data): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/payment/verify`, data)
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

export { createPayment, verifyPayment }
