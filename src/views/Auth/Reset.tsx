import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Input from './components/Input'
import { resetPassword } from 'apis/auth'
import { setLoading } from 'store/app'
import { validatePassword } from 'utils'

type ResetData = {
  password: string
  confirmPassword: string
}

const Reset = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = router.query
  const [data, setData] = useState<ResetData>({
    password: '',
    confirmPassword: '',
  })
  const [validations, setValidations] = useState<ResetData>({
    password: '',
    confirmPassword: '',
  })
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onChange = (type: string, value: string) => {
    setData((prevState) => ({ ...prevState, [type]: value }))
    setValidations((prevState) => ({ ...prevState, [type]: '' }))
  }

  const onSubmit = () => {
    if (data.password === '') {
      setValidations((prevState) => ({ ...prevState, password: 'empty' }))
    } else if (!validatePassword(data.password)) {
      setValidations((prevState) => ({ ...prevState, password: 'invalid' }))
    } else if (data.confirmPassword === '') {
      setValidations((prevState) => ({ ...prevState, confirmPassword: 'empty' }))
    } else if (data.confirmPassword !== data.password) {
      setValidations((prevState) => ({ ...prevState, confirmPassword: 'invalid' }))
    } else {
      dispatch(setLoading(true))
      resetPassword(token as string, data.password)
        .then(() => {
          setSuccesse(true)
          dispatch(setLoading(false))
        })
        .catch(() => {
          setErrorMessage('Failed to reset password. Please check if the reset password link is right.')
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
      <p className="text-24 leading-18 text-sf-gray-300">Reset Password</p>
      <div className="w-full h-50" />
      <div className="w-full">
        {success ? (
          <>
            <p className="text-12 text-sf-green-400/30 font-poppins">
              Great! Password reset successful, now you can login with your new password.
            </p>
            <div className="w-full h-40" />
            <Link href="/login">
              <button className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase mb-166">
                BACK TO LOGIN
              </button>
            </Link>
          </>
        ) : (
          <>
            <Input
              label="New Password"
              type="password"
              placeholder="Enter Password"
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
            {errorMessage ? (
              <span className="text-12 leading-16 text-sf-red-500 font-poppins block mt-20 mb-50">{errorMessage}</span>
            ) : (
              <div className="w-full h-80" />
            )}
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

export default Reset
