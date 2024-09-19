import { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Input from './components/Input'
import { requestForgotPassword } from 'apis/auth'
import { setLoading } from 'store/app'
import { validateEmail } from 'utils'

const Recover = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [validation, setValidation] = useState<string>('')
  const [success, setSuccesse] = useState<boolean>(false)

  const onChange = (value: string) => {
    setEmail(value)
    setValidation('')
  }

  const onSubmit = () => {
    if (email === '') {
      setValidation('empty')
    } else if (!validateEmail(email)) {
      setValidation('invalid')
    } else {
      dispatch(setLoading(true))
      requestForgotPassword(email)
        .then(() => {
          setSuccesse(true)
          dispatch(setLoading(false))
        })
        .catch(() => {
          setValidation('incorrect')
          dispatch(setLoading(false))
        })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="w-180 cursor-pointer" />
      </Link>
      <div className="w-full h-36" />
      <p className="text-24 leading-18 text-sf-gray-300">Recover Password</p>
      <div className="w-full h-50" />
      <div className="w-full">
        <Input
          label="Email"
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          invalid={!!validation}
          required
        />
        {!!validation ? (
          <span className="text-10 leading-16 text-sf-red-500 font-poppins block mt-4">
            {validation === 'empty'
              ? 'Please enter an email address.'
              : validation === 'invalid'
              ? 'Please enter a valid email address.'
              : 'Sorry, that email does not seem to exist. Please try again'}
          </span>
        ) : null}
        {success ? (
          <>
            <div className="w-full h-20" />
            <p className="text-12 text-sf-green-400/30 font-poppins">
              Thank you! Details have been sent to your email to recover your password.
            </p>
            <div className="w-full h-40" />
            <Link href="/login">
              <button className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase">
                BACK TO LOGIN
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="w-full h-80" />
            <button
              className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase"
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Recover
