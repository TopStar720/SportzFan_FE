import { NotificationCategoryType, NotificationData, NotificationTypeEnum } from 'views/Notification/types'
import { ChallengeTypeEnum, GameTypeEnum, PollTypeEnum } from 'views/Play/types'
import api from './api'

const getAllNotificationList = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/notification/user/list`)
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

const getNotificationList = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/notification/user/list?skip=${skip}&take=${take}`)
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

const getCountIsntSeen = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/notification/user/list?isSeen=${false}`)
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

const seeNotification = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .put(`/notification/notification/${id}`)
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

const removeNotification = (): any => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/notification/delete-all`)
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

const getNotificationDetail = (notification: NotificationData): any => {
  let detail_api_url = ''
  if (
    notification.category === NotificationCategoryType.Game &&
    notification.section === GameTypeEnum.Predict &&
    notification.type === NotificationTypeEnum.GameAlive
  )
    detail_api_url = '/game/prediction'
  if (
    notification.category === NotificationCategoryType.Game &&
    notification.section === GameTypeEnum.Trivia &&
    notification.type === NotificationTypeEnum.GameAlive
  )
    detail_api_url = '/game/trivia'
  if (
    notification.category === NotificationCategoryType.Game &&
    notification.section === GameTypeEnum.Predict &&
    notification.type === NotificationTypeEnum.GameEnded
  )
    detail_api_url = '/game/prediction/my-result'
  if (
    notification.category === NotificationCategoryType.Game &&
    notification.section === GameTypeEnum.Trivia &&
    notification.type === NotificationTypeEnum.GameEnded
  )
    detail_api_url = '/game/trivia/my-result'
  if (
    notification.category === NotificationCategoryType.Game &&
    notification.section === GameTypeEnum.Milestone &&
    notification.type !== NotificationTypeEnum.Reward
  )
    detail_api_url = '/milestone/milestone'
  if (
    notification.category === NotificationCategoryType.Challenge &&
    notification.section === ChallengeTypeEnum.CheckIn &&
    notification.type === NotificationTypeEnum.ChallengeAlive
  )
    detail_api_url = '/challenge/check-in'
  if (
    notification.category === NotificationCategoryType.Challenge &&
    notification.section === ChallengeTypeEnum.CheckIn &&
    (notification.type === NotificationTypeEnum.ChallengeCompleted || notification.type === NotificationTypeEnum.Reward)
  )
    detail_api_url = '/challenge/check-in/play'
  if (
    notification.category === NotificationCategoryType.Challenge &&
    notification.section === ChallengeTypeEnum.Survey &&
    notification.type === NotificationTypeEnum.ChallengeAlive
  )
    detail_api_url = '/challenge/survey'
  if (
    notification.category === NotificationCategoryType.Challenge &&
    notification.section === ChallengeTypeEnum.Survey &&
    (notification.type === NotificationTypeEnum.ChallengeCompleted || notification.type === NotificationTypeEnum.Reward)
  )
    detail_api_url = '/challenge/survey/play'
  if (notification.category === NotificationCategoryType.Poll) detail_api_url = '/poll'
  if (notification.category === NotificationCategoryType.Asset) detail_api_url = '/asset'
  if (
    (notification.type === NotificationTypeEnum.Reward && notification.section === GameTypeEnum.Milestone) ||
    notification.type === NotificationTypeEnum.MilestoneEligible
  )
    detail_api_url = '/milestone/milestone/play'

  if (detail_api_url === '') return {}

  return new Promise((resolve, reject) => {
    api
      .get(`${detail_api_url}/${notification.uniqueId}`)
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
  getAllNotificationList,
  getNotificationList,
  getCountIsntSeen,
  seeNotification,
  getNotificationDetail,
  removeNotification,
}
