import axios from 'axios'
import { API_BASE_URL } from 'config'
import { getToken } from 'utils'

const api = axios.create()

api.interceptors.request.use(
  async (request) => {
    const baseURL = API_BASE_URL || ''
    const token = getToken()
    request.url = baseURL + request.url

    if (!!token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      }
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
