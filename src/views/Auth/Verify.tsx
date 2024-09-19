import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Input from './components/Input'
import { verifyEmail } from 'apis/auth'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'

const Verify = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { token } = router.query
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [resendSuccess, setResendSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (!!token) {
      dispatch(setLoading(true))
      verifyEmail(token as string)
        .then(() => {
          setSuccesse(true)
          dispatch(setLoading(false))
        })
        .catch(() => {
          setErrorMessage('Sorry! The link is invalid.')
          dispatch(setLoading(false))
        })
    }
  }, [token])

  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <img src="/assets/images/adelaide-logo.svg" alt="Adelaide logo" className="w-180 cursor-pointer" />
      </Link>
      <div className="w-full h-36" />
      <p className="text-24 leading-18 text-sf-gray-300">Account Verification</p>
      <div className="w-full h-50" />
      <div className="h-240">
        {resendSuccess ? (
          <>
            <p className="text-12 text-sf-green-400/30 font-poppins text-center sm:text-left">
              Thank you. Please check your email inbox to activate your account. Check your junk email folder in case
              our message got lost there.
            </p>
            <div className="w-full h-40" />
            <Link href="/login">
              <button className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase mb-380">
                BACK TO LOGIN
              </button>
            </Link>
          </>
        ) : !!errorMessage ? (
          <>
            <p className="text-12 text-sf-neutral-500 font-poppins text-center sm:text-left">{errorMessage}</p>
            <p className="text-12 text-sf-neutral-500 font-poppins text-center sm:text-left">
              Please below to send another link to your email
            </p>
            <div className="w-full h-40" />
            <button
              className="w-full h-50 bg-danger rounded-[4px] leading-20 text-white uppercase"
              onClick={() => setResendSuccess(true)}
            >
              Re-send Link
            </button>
          </>
        ) : success ? (
          <>
            <p className="text-12 text-sf-green-400/30 font-poppins text-center sm:text-left">
              Your account is now verified successfully. Please login with your details.
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
            <p className="text-12 text-sf-neutral-500 font-poppins text-center sm:text-left">
              Verifying now. Just a moment...
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Verify
