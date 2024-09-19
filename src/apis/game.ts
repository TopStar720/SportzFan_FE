import api from './api'
import { TEAM_ID } from 'config'
import { PredictScores } from 'views/Play/Game/Predict/types'
import { TriviaAnswer } from 'views/Play/Game/Trivia/types'

const getGameList = (): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/list?isDraft=false&search=${TEAM_ID}`)
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

const getGamesByPagination = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/list?skip=${skip}&take=${take}&isDraft=false&search=${TEAM_ID}`)
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

const getGamePrediction = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/prediction/${id}`)
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

const playGamePrediction = (id: string, data: PredictScores): any => {
  return new Promise((resolve, reject) => {
    api
      .post('/game/prediction/play', { predictionId: id, ...data })
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

const getGamePredictionResult = (predictionId: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/prediction/my-result/${predictionId}`)
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

const getGameTrivia = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/trivia/${id}`)
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

const playGameTrivia = (triviaId: string, answer: TriviaAnswer[], takenTime: number): any => {
  return new Promise((resolve, reject) => {
    api
      .post('/game/trivia/play', { triviaId, answer, takenTime })
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

const checkPlayStatusGameTrivia = (triviaId: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/trivia/play/check/${triviaId}`)
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

const getGameTriviaResult = (triviaId: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/trivia/my-result/${triviaId}`)
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

const getGameMilestone = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/milestone/milestone/${id}`)
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

const playGameMilestone = (milestoneId: string): any => {
  return new Promise((resolve, reject) => {
    api
      .post('/milestone/milestone/play', { milestoneId })
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

const getGameMini = (id: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/mini-game/${id}`)
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

const getMyGameList = (skip: number, take: number): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/game/my-list?skip=${skip}&take=${take}`)
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
  getGameList,
  getGamesByPagination,
  getGamePrediction,
  playGamePrediction,
  getGamePredictionResult,
  getGameTrivia,
  playGameTrivia,
  checkPlayStatusGameTrivia,
  getGameTriviaResult,
  getGameMilestone,
  playGameMilestone,
  getGameMini,
  getMyGameList,
}
