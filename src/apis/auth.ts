import { LoginData } from 'views/Auth/Login'
import { RegisterData } from 'views/Auth/Register'
import api from './api'
import { TEAM_ID } from 'config'

const login = (data: LoginData): any => {
  return new Promise((resolve, reject) => {
    api
      .post('/auth/login', { ...data, teamId: TEAM_ID })
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

const signup = (data: RegisterData): any => {
  return new Promise((resolve, reject) => {
    api
      .post('/auth/signup', { ...data, teamId: TEAM_ID })
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

const signupWithCode = (data: RegisterData, code: string): any => {
  return new Promise((resolve, reject) => {
    api
      .post(`/auth/signup/${code}`, { ...data, teamId: TEAM_ID })
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

const verifyEmail = (token: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/user/verify/${token}`)
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

const requestForgotPassword = (email: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/user/forgot-password-pre-request/${TEAM_ID}/${email}`)
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

const resetPassword = (code: string, password: string): any => {
  return new Promise((resolve, reject) => {
    api
      .get(`/user/forgot-password-request/${code}/${password}`)
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

export { login, signup, signupWithCode, verifyEmail, requestForgotPassword, resetPassword }
