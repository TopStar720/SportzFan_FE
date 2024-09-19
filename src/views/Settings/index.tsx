import { useState } from 'react'
import Link from 'next/link'
import { updatePassword } from 'apis/user'
import { ErrorData } from 'apis/types'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { classNames, validatePassword } from 'utils'

export type SettingsData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const Settings = () => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<SettingsData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [validations, setValidations] = useState<SettingsData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onChange = (type: string, value: string) => {
    setData((prevState) => ({ ...prevState, [type]: value }))
    setValidations((prevState) => ({ ...prevState, [type]: '' }))
  }

  const onSubmit = () => {
    if (data.oldPassword === '') {
      setValidations((prevState) => ({ ...prevState, oldPassword: 'empty' }))
    } else if (data.newPassword === '') {
      setValidations((prevState) => ({ ...prevState, newPassword: 'empty' }))
    } else if (!validatePassword(data.newPassword)) {
      setValidations((prevState) => ({ ...prevState, newPassword: 'invalid' }))
    } else if (data.confirmPassword === '') {
      setValidations((prevState) => ({ ...prevState, confirmPassword: 'empty' }))
    } else if (data.confirmPassword !== data.newPassword) {
      setValidations((prevState) => ({ ...prevState, confirmPassword: 'invalid' }))
    } else {
      dispatch(setLoading(true))
      updatePassword(data)
        .then(() => {
          setSuccesse(true)
          dispatch(setLoading(false))
        })
        .catch((err: ErrorData) => {
          const code = err.response?.data?.code
          if (code === 10002) {
            setValidations((prevState) => ({ ...prevState, oldPassword: 'incorrect' }))
          } else {
            setErrorMessage('Failed to update password because something went wrong.')
          }

          dispatch(setLoading(false))
        })
    }
  }

  return (
    <div className="w-full border border-sf-zinc-600 rounded-[4px]">
      <div className="relative bg-info w-full rounded-t-[4px] py-44">
        <div className="m-auto flex flex-col items-center">
          <img src="/assets/images/user-settings-yellow.svg" className="w-58" />
          <p className="text-24 leading-30 text-sf-gray-300 font-bold mt-10">Settings</p>
        </div>
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/shine-large.svg')] bg-cover bg-center" />
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/bg-with-spiral-curves.png')] bg-cover bg-center" />
      </div>
      <div className="max-w-430 px-10 pt-30 pb-52 m-auto">
        <p className="text-14 text-sf-gray-300 font-bold mt-10">Security</p>
        <div className="w-full h-12" />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <label htmlFor="old-password" className="block mb-6 text-10 text-white/60 font-poppins">
              Old Password
            </label>
            <input
              className={classNames(
                'w-full h-36 bg-transparent border rounded-[5px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins',
                !validations.oldPassword ? 'border-sf-zinc-600' : 'border-sf-rose-700',
              )}
              type="password"
              id="old-password"
              placeholder="Enter Old Password"
              value={data.oldPassword}
              onChange={(e) => onChange('oldPassword', e.target.value)}
            />
            {validations.oldPassword === 'empty' ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                Old password is required
              </span>
            ) : validations.oldPassword === 'incorrect' ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                Password incorrect. Please try again.
              </span>
            ) : null}
          </div>
          <div className="col-start-1">
            <label htmlFor="new-password" className="block mb-6 text-10 text-white/60 font-poppins">
              New Password
            </label>
            <input
              className={classNames(
                'w-full h-36 bg-transparent border rounded-[5px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins',
                !validations.newPassword ? 'border-sf-zinc-600' : 'border-sf-rose-700',
              )}
              type="password"
              id="new-password"
              placeholder="Enter New Password"
              value={data.newPassword}
              onChange={(e) => onChange('newPassword', e.target.value)}
            />
            {validations.newPassword === 'empty' ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                New password is required
              </span>
            ) : validations.newPassword === 'invalid' ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                Password should be minimum 6 characters with 1 number and 1 special character.
              </span>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block mb-6 text-10 text-white/60 font-poppins">
              Confirm New Password
            </label>
            <input
              className={classNames(
                'w-full h-36 bg-transparent border rounded-[5px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins',
                !validations.confirmPassword ? 'border-sf-zinc-600' : 'border-sf-rose-700',
              )}
              type="password"
              id="confirm-password"
              placeholder="Enter Confirm New Password"
              value={data.confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
            />
            {validations.confirmPassword === 'empty' ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                Confirm password is required
              </span>
            ) : validations.confirmPassword === 'invalid' ? (
              <span className="text-10 leading-16 text-sf-rose-700 font-poppins block mt-2">
                Passwords do not match.
              </span>
            ) : null}
          </div>
        </div>
        {success ? (
          <>
            <div className="w-full h-10" />
            <p className="text-12 text-sf-green-400 font-poppins">Your password has successfully been updated.</p>
          </>
        ) : null}
        {!!errorMessage ? (
          <>
            <div className="w-full h-10" />
            <p className="text-12 text-sf-rose-700 font-poppins">{errorMessage}</p>
          </>
        ) : null}
        <div className="w-full h-16" />
        <button
          className="w-full md:w-fit bg-danger rounded-[4px] px-10 py-8 text-12 leading-14 text-white uppercase"
          onClick={onSubmit}
        >
          Update Password
        </button>
        <div className="w-full h-40" />
        <p className="text-14 text-sf-gray-300 font-bold mt-10">Delete Account</p>
        <div className="w-full h-10" />
        <div className="w-full bg-info border border-sf-zinc-600 rounded-[4px] px-14 pt-12 pb-18">
          <p className="text-10 text-sf-zinc-400 font-poppins">
            To delete your account, click the button below to proceed to the contact page to request the deletion of
            your account
          </p>
          <div className="w-full h-12" />
          <Link href="/help">
            <button className="bg-danger rounded-[4px] px-10 py-8 text-12 leading-14 text-white uppercase">
              Proceed
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Settings
