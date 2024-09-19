import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getReferralLink, referFriend } from 'apis/user'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { classNames, validateEmail } from 'utils'

const Referral = () => {
  const dispatch = useAppDispatch()
  const [referralLink, setReferralLink] = useState<string>('')
  const [validation, setValidation] = useState<string>('')
  const [codeCopied, setCodeCopied] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const loadReferralLink = useCallback(() => {
    dispatch(setLoading(true))
    getReferralLink()
      .then((res: string) => {
        setReferralLink(res)
        dispatch(setLoading(false))
      })
      .catch(() => {
        setErrorMessage('Failed to get a referral link.')
        dispatch(setLoading(false))
      })
  }, [dispatch])

  useEffect(() => {
    loadReferralLink()
  }, [loadReferralLink])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setValidation('')
  }

  const onSubmit = () => {
    if (email === '') {
      setValidation('empty')
    } else if (!validateEmail(email)) {
      setValidation('invalid')
    } else {
      dispatch(setLoading(true))
      referFriend(email)
        .then(() => {
          setSuccesse(true)
          dispatch(setLoading(false))
          setEmail('')
        })
        .catch(() => {
          setErrorMessage('Failed to refer a friend.')
          dispatch(setLoading(false))
        })
    }
  }
  return (
    <Fragment>
      <div className="w-full border border-sf-zinc-600 rounded-[4px]">
        <div className="relative bg-info w-full rounded-t-[4px] pt-50 pb-40 sm:pt-56 sm:pb-34">
          <div className="flex flex-col items-center">
            <img src="/assets/images/gift-and-decoration.svg" className="w-58 xl:w-70" />
            <p className="text-24 leading-30 text-sf-gray-300 font-bold mt-4">Refer a Friend</p>
            <p className="text-14 leading-20 text-sf-gray-300">earn up to 2000 Tokens + 700 Kudos points</p>
          </div>
          <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine-large.svg')] bg-cover bg-center" />
          <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/bg-with-gifts.png')] bg-cover bg-center" />
        </div>
      </div>
      <div className="w-full h-24" />
      <div className="grid sm:grid-cols-3 gap-20 xl:gap-30 xl:px-66 sm:text-center">
        <div className="flex sm:flex-col items-center">
          <p className="hidden sm:block text-14 text-sf-yellow-300 font-medium font-poppins">Step 1</p>
          <div className="relative sm:mt-10">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-76 m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/user-yellow.svg" alt="" className="w-40" />
            </div>
          </div>
          <div className="flex flex-col ml-12 sm:ml-0 sm:mt-10">
            <p className="sm:hidden text-14 text-sf-yellow-300 font-medium font-poppins">Step 1</p>
            <p className="text-14 text-sf-gray-300 mt-4 sm:mt-10">Invite your Friends</p>
            <p className="text-12 text-sf-yellow-700 font-poppins mt-2 sm:mt-6">Just share your link</p>
          </div>
        </div>
        <div className="flex sm:flex-col items-center">
          <p className="hidden sm:block text-14 text-sf-yellow-300 font-medium font-poppins">Step 2</p>
          <div className="relative sm:mt-10">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-76 m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/check-list-yellow.svg" alt="" className="w-32" />
            </div>
          </div>
          <div className="flex flex-col ml-12 sm:ml-0 sm:mt-10">
            <p className="sm:hidden text-14 text-sf-yellow-300 font-medium font-poppins">Step 2</p>
            <p className="text-14 text-sf-gray-300 mt-4 sm:mt-10">They complete registration</p>
            <p className="text-12 text-sf-yellow-700 font-poppins mt-2 sm:mt-6">
              {'You Earn 1500 Tokens & 500 Kudos Points'}
            </p>
          </div>
        </div>
        <div className="flex sm:flex-col items-center">
          <p className="hidden sm:block text-14 text-sf-yellow-300 font-medium font-poppins">Step 3</p>
          <div className="relative sm:mt-10">
            <img src="/assets/images/glitter.svg" alt="" className="mix-blend-screen w-76 m-auto" />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center">
              <img src="/assets/images/balls-yellow.svg" alt="" className="w-48" />
            </div>
          </div>
          <div className="flex flex-col ml-12 sm:ml-0 sm:mt-10">
            <p className="sm:hidden text-14 text-sf-yellow-300 font-medium font-poppins">Step 3</p>
            <p className="text-14 text-sf-gray-300 mt-4 sm:mt-10">They play their first game</p>
            <p className="text-12 text-sf-yellow-700 font-poppins mt-2 sm:mt-6">
              {'You Earn 500 Tokens & 200 Kudos Points'}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-24" />
      <div className="flex flex-col items-center xs:px-20">
        <p className="text-12 text-sf-zinc-400 font-poppins">Copy your personal code to share anywhere</p>
        <div className="w-full sm:max-w-350 flex justify-between items-center bg-sf-zinc-700 rounded-[5px] p-6 mt-6">
          <span className="overflow-hidden whitespace-nowrap text-ellipsis text-12 text-white font-medium font-poppins px-12">
            {referralLink}
          </span>
          <CopyToClipboard text={referralLink} onCopy={() => setCodeCopied(true)}>
            <button className="min-w-80 h-30 bg-danger rounded-[4px] text-12 text-white uppercase">
              {codeCopied ? 'Copied' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
        <div className="w-full h-22" />
        <p className="text-12 text-sf-zinc-400 font-poppins">Share your referral link by email</p>
        <div
          className={classNames(
            'w-full sm:max-w-350 flex justify-between items-center rounded-[5px] border p-6 mt-6',
            !validation ? 'border-sf-zinc-600' : 'border-sf-rose-700',
          )}
        >
          <input
            className="w-full bg-transparent text-12 text-white font-medium font-poppins px-12"
            placeholder="Enter email id"
            value={email}
            onChange={onChange}
          />
          <button className="min-w-80 h-30 bg-danger rounded-[4px] text-12 text-white uppercase" onClick={onSubmit}>
            Send
          </button>
        </div>
        {validation === 'empty' ? (
          <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">Email is required</span>
        ) : validation === 'invalid' ? (
          <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
            Please enter a valid email address.
          </span>
        ) : null}
        {success ? (
          <>
            <div className="w-full h-10" />
            <p className="text-12 text-sf-green-400 font-poppins">Your invitation has been successfully sent.</p>
          </>
        ) : null}
        {!!errorMessage ? (
          <>
            <div className="w-full h-10" />
            <p className="text-12 text-sf-rose-700 font-poppins">{errorMessage}</p>
          </>
        ) : null}
      </div>
    </Fragment>
  )
}

export default Referral
