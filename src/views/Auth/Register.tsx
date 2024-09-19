import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Input from './components/Input'
import { signup, signupWithCode } from 'apis/auth'
import { ErrorData } from 'apis/types'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { validateEmail, validatePassword } from 'utils'

export type RegisterData = {
  firstName: string
  lastName?: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

const Register = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { token } = router.query
  const [data, setData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [validations, setValidations] = useState<RegisterData>({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onChange = (type: string, value: string | boolean) => {
    setData((prevState) => ({ ...prevState, [type]: value }))
    setValidations((prevState) => ({ ...prevState, [type]: '' }))
  }

  const handleRegister = () => {
    if (data.firstName === '') {
      setValidations((prevState) => ({ ...prevState, firstName: 'empty' }))
    } else if (data.email === '') {
      setValidations((prevState) => ({ ...prevState, email: 'empty' }))
    } else if (!validateEmail(data.email)) {
      setValidations((prevState) => ({ ...prevState, email: 'invalid' }))
    } else if (data.password === '') {
      setValidations((prevState) => ({ ...prevState, password: 'empty' }))
    } else if (!validatePassword(data.password)) {
      setValidations((prevState) => ({ ...prevState, password: 'invalid' }))
    } else if (data.confirmPassword === '') {
      setValidations((prevState) => ({ ...prevState, confirmPassword: 'empty' }))
    } else if (data.confirmPassword !== data.password) {
      setValidations((prevState) => ({ ...prevState, confirmPassword: 'invalid' }))
    } else {
      dispatch(setLoading(true))
      if (!!token) {
        signupWithCode(data, token as string)
          .then(() => {
            setSuccesse(true)
            dispatch(setLoading(false))
          })
          .catch((err: ErrorData) => {
            const code = err.response?.data?.code
            if (code === 10006) {
              setValidations((prevState) => ({ ...prevState, email: 'incorrect' }))
            } else {
              setErrorMessage('Registration failed because something went wrong.')
            }

            dispatch(setLoading(false))
          })
      } else {
        signup(data)
          .then(() => {
            setSuccesse(true)
            dispatch(setLoading(false))
          })
          .catch((err: ErrorData) => {
            const code = err.response?.data?.code
            if (code === 10006) {
              setValidations((prevState) => ({ ...prevState, email: 'incorrect' }))
            } else {
              setErrorMessage('Registration failed because something went wrong.')
            }

            dispatch(setLoading(false))
          })
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="w-180 cursor-pointer" />
      </Link>
      <div className="w-full h-36" />
      <p className="text-24 leading-18 text-sf-gray-300">Register</p>
      <div className="w-full h-32" />
      {success ? (
        <>
          <div className="w-full h-20" />
          <p className="text-12 text-sf-green-400/30 font-poppins">
            Thank you. Please check your email inbox to activate your account. Check your junk email folder in case our
            message got lost there.
          </p>
          <div className="w-full h-40" />
          <Link href="/login">
            <button className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase mb-380">
              BACK TO LOGIN
            </button>
          </Link>
        </>
      ) : (
        <div className="w-full">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter First Name"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            invalid={!!validations.firstName}
            required
          />
          {!!validations.firstName ? (
            <span className="text-10 leading-16 text-sf-red-500 font-poppins block mt-4">Please enter your name.</span>
          ) : null}
          <div className="w-full h-14" />
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email Address"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            invalid={!!validations.email}
            required
          />
          {!!validations.email ? (
            <span className="text-10 leading-16 text-sf-red-500 font-poppins block mt-4">
              {validations.email === 'empty'
                ? 'Please enter an email address.'
                : validations.email === 'invalid'
                ? 'Please enter a valid email address.'
                : 'Email is already registered. Please try signing in instead.'}
            </span>
          ) : null}
          <div className="w-full h-14" />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => onChange('password', e.target.value)}
            invalid={!!validations.password}
            required
          />
          {!!validations.password ? (
            <span className="text-10 leading-16 text-sf-red-500 font-poppins block mt-4">
              {validations.password === 'empty'
                ? 'Please enter a password.'
                : 'Password should be minimum 6 characters with 1 number and 1 special character.'}
            </span>
          ) : null}
          <div className="w-full h-14" />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            invalid={!!validations.confirmPassword}
            required
          />
          {!!validations.confirmPassword ? (
            <span className="text-10 leading-16 text-sf-red-500 font-poppins block mt-4">
              {validations.confirmPassword === 'empty' ? 'Please confirm your password.' : 'Passwords do not match.'}
            </span>
          ) : null}
          <div className="w-full h-14" />
          <div className="flex">
            <label className="checkbox-container cursor-pointer relative w-22 h-22">
              <input
                id="terms"
                type="checkbox"
                className="w-0"
                onChange={() => onChange('agreeTerms', !data.agreeTerms)}
              />
              <span className="checkmark absolute inset-0 bg-transparent border border-sf-neutral-400/70 w-22 h-22 rounded-[3px]" />
            </label>
            <label htmlFor="terms" className="ml-24 text-12 leading-18 text-white/80 font-poppins">
              By registering you agree to our{' '}
              <Link href="/terms">
                <span className="text-sf-rose-700 cursor-pointer hover:underline">Terms and Conditions</span>
              </Link>
              . Learn how we collect and share your personal data in our{' '}
              <Link href="/privacy">
                <span className="text-sf-rose-700 cursor-pointer hover:underline">Privacy Policy</span>
              </Link>
            </label>
          </div>
          {errorMessage ? (
            <span className="text-12 leading-16 text-sf-red-500 font-poppins block mt-20">{errorMessage}</span>
          ) : null}
          <div className="w-full h-26" />
          <button
            className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase"
            disabled={!data.agreeTerms}
            onClick={() => handleRegister()}
          >
            Signup
          </button>
          <div className="w-full h-26" />
          <div className="flex justify-center px-8 text-14 leading-18">
            <span className="text-sf-neutral-500 mr-4">Already have an account?</span>
            <Link href="/login">
              <span className="text-sf-rose-700 cursor-pointer hover:underline">Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
