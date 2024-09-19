import api from './api'
import { AssetType } from 'views/Marketplace/types'

const getAssetList = (skip: number = 0, take: number = 5, type?: AssetType): any => {
  const url = !!type
    ? `/asset/user/list?skip=${skip}&take=${take}&type=${type}`
    : `/asset/user/list?skip=${skip}&take=${take}`
  return new Promise((resolve, reject) => {
    api
      .get(url)
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

const getMyAssetList = (skip: number = 0, take: number = 5, type?: AssetType): any => {
  const url = !!type
    ? `/asset/mine/list?skip=${skip}&take=${take}&type=${type}`
    : `/asset/mine/list?skip=${skip}&take=${take}`
  return new Promise((resolve, reject) => {
    api
      .get(url)
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

const getAsset = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/asset/${id}`)
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

const redeemAsset = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/asset/${id}/redeem`)
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

const claimAsset = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/asset/${id}/claim`)
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

export { getAssetList, getMyAssetList, getAsset, redeemAsset, claimAsset }
