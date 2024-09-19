import { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Input from './components/Input'
import useAuth from 'hooks/useAuth'
import { validateEmail } from 'utils'
import { login } from 'apis/auth'
import { ErrorData } from 'apis/types'
import { setLoading } from 'store/app'

export type LoginData = {
  email: string
  password: string
}

const Login = () => {
  const dispatch = useDispatch()
  const { addToken } = useAuth()
  const [data, setData] = useState<LoginData>({
    email: '',
    password: '',
  })
  const [validations, setValidations] = useState<LoginData>({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onChange = (type: string, value: string) => {
    setData((prevState) => ({ ...prevState, [type]: value }))
    setValidations((prevState) => ({ ...prevState, [type]: '' }))
  }

  const handleLogin = () => {
    if (data.email === '') {
      setValidations((prevState) => ({ ...prevState, email: 'empty' }))
    } else if (!validateEmail(data.email)) {
      setValidations((prevState) => ({ ...prevState, email: 'invalid' }))
    } else if (data.password === '') {
      setValidations((prevState) => ({ ...prevState, password: 'empty' }))
    } else {
      dispatch(setLoading(true))
      login(data)
        .then((res: { access_token: string; lastLoginAt: string; registerRank: string }) => {
          if (!res.lastLoginAt && parseInt(res.registerRank) <= 100) {
            localStorage.setItem('signUpRewarded', JSON.stringify(true))
          }

          addToken(res.access_token)
          dispatch(setLoading(false))
        })
        .catch((err: ErrorData) => {
          const code = err.response?.data?.code
          if (code === 10001) {
            setValidations((prevState) => ({ ...prevState, email: 'incorrect' }))
          } else if (code === 10002) {
            setValidations((prevState) => ({ ...prevState, password: 'incorrect' }))
          } else if (code === 10003) {
            setValidations((prevState) => ({ ...prevState, email: 'unverified' }))
          } else if (code === 10004) {
            setErrorMessage('Your account is not activated.')
          } else {
            setErrorMessage('Failed to login because something went wrong.')
          }

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
      <p className="text-24 leading-18 text-sf-gray-300">Login</p>
      <div className="w-full h-32" />
      <div className="w-full">
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
              : validations.email === 'unverified'
              ? 'Your email is not verified yet.'
              : 'Email address incorrect. Please try again.'}
          </span>
        ) : null}
        <div className="w-full h-14" />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => onChange('password', e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
          invalid={!!validations.password}
          required
        />
        {!!validations.password ? (
          <span className="text-10 leading-16 text-sf-red-500 font-poppins block mt-4">
            {validations.password === 'empty' ? 'Please enter a password.' : 'Password incorrect. Please try again.'}
          </span>
        ) : null}
        <div className="w-full h-20" />
        <Link href="/recover-password">
          <span className="text-12 text-white/60 font-poppins cursor-pointer hover:underline">Forgot password?</span>
        </Link>
        {errorMessage ? (
          <span className="text-12 leading-16 text-sf-red-500 font-poppins block mt-20">{errorMessage}</span>
        ) : null}
        <div className="w-full h-32" />
        <button
          className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase"
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <div className="w-full h-30" />
        <div className="flex justify-center px-8 text-14 leading-18">
          <span className="text-sf-neutral-500 mr-4">Don't have an account?</span>
          <Link href="/register">
            <span className="text-sf-rose-700 cursor-pointer hover:underline">Create an Account</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
