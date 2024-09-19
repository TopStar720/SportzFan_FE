import api from './api'
import { ContactSupportData } from 'views/Help/components/Support'

const contactSupport = (data: ContactSupportData): any => {
  return new Promise((resolve, reject) => {
    api
      .post('/support/contact', data)
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

export { contactSupport }
