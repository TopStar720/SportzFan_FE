import { useState } from 'react'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { classNames, validateEmail } from 'utils'
import { contactSupport } from 'apis/support'

export type ContactSupportData = {
  email: string
  subject: string
  message: string
}

const Support = () => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<ContactSupportData>({
    email: '',
    subject: '',
    message: '',
  })
  const [validations, setValidations] = useState<ContactSupportData>({
    email: '',
    subject: '',
    message: '',
  })
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onChange = (type: string, value: string) => {
    setData((prevState) => ({ ...prevState, [type]: value }))
    setValidations((prevState) => ({ ...prevState, [type]: '' }))
  }

  const onSubmit = () => {
    if (data.email === '') {
      setValidations((prevState) => ({ ...prevState, email: 'empty' }))
    } else if (!validateEmail(data.email)) {
      setValidations((prevState) => ({ ...prevState, email: 'invalid' }))
    } else if (data.subject === '') {
      setValidations((prevState) => ({ ...prevState, subject: 'empty' }))
    } else if (data.message === '') {
      setValidations((prevState) => ({ ...prevState, message: 'empty' }))
    } else {
      dispatch(setLoading(true))
      contactSupport(data)
        .then(() => {
          setSuccesse(true)
          dispatch(setLoading(false))
          setData({
            email: '',
            subject: '',
            message: '',
          })
        })
        .catch(() => {
          setErrorMessage('Failed to contact support.')
          dispatch(setLoading(false))
        })
    }
  }

  return (
    <div className="w-full border border-sf-zinc-600 rounded-[4px]">
      <div className="relative bg-info w-full rounded-t-[4px] py-44">
        <div className="m-auto flex flex-col items-center">
          <img src="/assets/images/user-receiver-yellow.svg" className="w-62" />
          <p className="text-24 leading-30 text-sf-gray-300 font-bold mt-10">{'Help & Support'}</p>
        </div>
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine-large.svg')] bg-cover bg-center" />
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/bg-with-spiral-curves.png')] bg-cover bg-center" />
      </div>
      <div className="max-w-430 px-10 pt-30 pb-52 m-auto">
        <div>
          <label htmlFor="email" className="block mb-6 text-10 text-white/60 font-poppins">
            Email Address
          </label>
          <input
            className={classNames(
              'w-full h-36 bg-transparent border rounded-[5px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins',
              !validations.email ? 'border-sf-zinc-600' : 'border-sf-rose-700',
            )}
            type="text"
            id="email"
            placeholder="Enter Email Address"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          {validations.email === 'empty' ? (
            <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">Email is required</span>
          ) : validations.email === 'invalid' ? (
            <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
              Please enter a valid email address.
            </span>
          ) : null}
        </div>
        <div className="w-full h-12" />
        <div>
          <label htmlFor="subject" className="block mb-6 text-10 text-white/60 font-poppins">
            Subject
          </label>
          <input
            className={classNames(
              'w-full h-36 bg-transparent border rounded-[5px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins',
              !validations.subject ? 'border-sf-zinc-600' : 'border-sf-rose-700',
            )}
            type="text"
            id="subject"
            placeholder="Enter Subject"
            value={data.subject}
            onChange={(e) => onChange('subject', e.target.value)}
          />
          {validations.subject === 'empty' ? (
            <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">Subject is required</span>
          ) : null}
        </div>
        <div className="w-full h-12" />
        <div>
          <label htmlFor="message" className="block mb-6 text-10 text-white/60 font-poppins">
            Message
          </label>
          <textarea
            className={classNames(
              'w-full bg-transparent border rounded-[5px] px-12 py-8 text-12 leading-18 text-sf-gray-300 font-poppins',
              !validations.message ? 'border-sf-zinc-600' : 'border-sf-rose-700',
            )}
            rows={4}
            id="message"
            placeholder="Enter Message"
            value={data.message}
            onChange={(e) => onChange('message', e.target.value)}
          />
          {validations.message === 'empty' ? (
            <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">Message is required</span>
          ) : null}
        </div>
        {success ? (
          <>
            <div className="w-full h-10" />
            <p className="text-12 text-sf-green-400 font-poppins">
              Your details has been sent successfully to our supprt team.
            </p>
          </>
        ) : null}
        {!!errorMessage ? (
          <>
            <div className="w-full h-10" />
            <p className="text-12 text-sf-rose-700 font-poppins">{errorMessage}</p>
          </>
        ) : null}
        <div className="w-full h-20" />
        <button
          className="w-full md:w-156 bg-danger rounded-[4px] px-10 py-8 text-12 leading-14 text-white uppercase block m-auto"
          onClick={onSubmit}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Support
