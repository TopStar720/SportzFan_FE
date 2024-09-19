export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function validateEmail(email: string) {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export function validatePassword(password: string) {
  return password.match(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\~\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?])[A-Za-z\d\!\@\#\$\%\^\&\*\(\)\-\=\~\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]{6,}$/,
  )
}

export const fileToDataUri = (file: any): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result as string)
    }
    reader.readAsDataURL(file)
  })

export const getToken = () => JSON.parse(localStorage.getItem('token'))

export const getPwaStatus = () => JSON.parse(localStorage.getItem('pwa'))

export const nFormatter = (num: number, digits: number): string => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i: number
  for (i = si.length - 1; i > 0; i--) {
    if (Math.abs(num) >= si[i].value) {
      break
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export const getOrdinalSuffix = (i: number): string => {
  const j = i % 10,
    k = i % 100
  if (j == 1 && k != 11) {
    return 'st'
  }
  if (j == 2 && k != 12) {
    return 'nd'
  }
  if (j == 3 && k != 13) {
    return 'rd'
  }
  return 'th'
}

export const getDateString = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  let dt: string | number = date.getDate()

  if (month < 10) {
    month = `0${month}`
  }

  if (dt < 10) {
    dt = `0${dt}`
  }

  return `${dt}-${month}-${year}`
}

export const getDateTimeString = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  let dt: string | number = date.getDate()
  let hr: string | number = date.getHours()
  let min: string | number = date.getMinutes()
  let ap = 'AM'

  if (month < 10) {
    month = `0${month}`
  }

  if (dt < 10) {
    dt = `0${dt}`
  }

  if (hr > 12) {
    hr = hr - 12
    ap = 'PM'
  }

  if (min < 10) {
    min = `0${min}`
  }

  return `${hr}:${min} ${ap}, ${dt}-${month}-${year}`
}

export const getStatusString = (start: string, end: string) => {
  const now = new Date()
  const startDate = new Date(start)
  const endDate = new Date(end)
  if (now < startDate) {
    return 'Upcoming'
  } else if (now >= startDate && now < endDate) {
    return 'Live'
  } else if (now >= endDate) {
    return 'Ended'
  }
}

export const dateToDateAndTime = (newDate: any, type: number = 0) => {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  var months_abb = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = newDate.getFullYear()
  let month = newDate.getMonth() + 1
  let dt = newDate.getDate()
  let hr = newDate.getHours()
  let min = newDate.getMinutes()
  let suffix = 'AM'
  let date = ''
  let time = ''

  if (dt < 10) {
    dt = `0${dt}`
  }
  if (month < 10) {
    month = `0${month}`
  }

  if (hr > 12) {
    hr = hr - 12
    suffix = 'PM'
  }

  if (hr < 10) {
    hr = `0${hr}`
  }

  if (min < 10) {
    min = `0${min}`
  }

  if (type === 1) {
    let daySuffix = 'th'
    const mon = months[newDate.getMonth()]

    if (dt % 10 === 1) daySuffix = 'st'
    if (dt % 10 === 2) daySuffix = 'nd'

    date = `${dt}${daySuffix} ${mon} ${year}`
  } else if (type === 2) {
    let daySuffix = 'th'
    const day = days[newDate.getDay()]
    const mon = months_abb[newDate.getMonth()]

    if (dt % 10 === 1) daySuffix = 'st'
    if (dt % 10 === 2) daySuffix = 'nd'

    date = `${day} ${dt}${daySuffix} ${mon} ${year}`
  } else {
    date = `${dt}-${month}-${year}`
  }

  time = `${hr}:${min} ${suffix}`

  return { date, time }
}

export const checkForIOS = () => {
  const windowNavigator: any = window.navigator
  if ('standalone' in windowNavigator && windowNavigator.standalone) {
    return false
  }

  const ua = window.navigator.userAgent
  const webkit = !!ua.match(/WebKit/i)
  const isIPad = !!ua.match(/iPad/i)
  const isIPhone = !!ua.match(/iPhone/i)
  const isIOS = isIPad || isIPhone
  const isSafari = isIOS && webkit && !ua.match(/CriOS/i)

  return isIOS && isSafari
}
