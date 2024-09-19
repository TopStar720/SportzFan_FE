import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import PhoneInput from 'react-phone-input-2'
import { Country, State } from 'country-state-city'
import { EditIcon } from 'components/Layouts/Sidebar/Icons'
import TriangleIcon from './components/TriangleIcon'
import { updateProfile, getProfileRewardData, getProfileRewardStatus } from 'apis/user'
import { uploadFile } from 'apis/upload'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setLoading } from 'store/app'
import { getUserData, getTeamData } from 'store/user'
import { classNames, fileToDataUri } from 'utils'
import { UserData, RewardData, RewardStatusData } from './types'
import RewardModal from './components/RewardModal'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.user)
  const avatarRef = useRef<HTMLInputElement>(null)
  const [profileData, setProfileData] = useState<UserData>(data)
  const [rewardAmounts, setRewardAmounts] = useState<RewardData>({
    birthdayFieldKudosAmount: 0,
    birthdayFieldTokenAmount: 0,
    emailFieldKudosAmount: 0,
    emailFieldTokenAmount: 0,
    fanTypeFieldKudosAmount: 0,
    fanTypeFieldTokenAmount: 0,
    favPlayerFieldKudosAmount: 0,
    favPlayerFieldTokenAmount: 0,
    genderFieldKudosAmount: 0,
    genderFieldTokenAmount: 0,
    lastNameFieldKudosAmount: 0,
    lastNameFieldTokenAmount: 0,
    locationCityFieldKudosAmount: 0,
    locationCityFieldTokenAmount: 0,
    locationCountryFieldKudosAmount: 0,
    locationCountryFieldTokenAmount: 0,
    locationStateFieldKudosAmount: 0,
    locationStateFieldTokenAmount: 0,
    phoneFieldKudosAmount: 0,
    phoneFieldTokenAmount: 0,
  })
  const [rewardStatus, setRewardStatus] = useState<RewardStatusData>({
    birthdayFieldFilled: false,
    emailFieldFilled: false,
    fanTypeFieldFilled: false,
    favPlayerFieldFilled: false,
    genderFieldFilled: false,
    lastNameFieldFilled: false,
    locationCityFieldFilled: false,
    locationCountryFieldFilled: false,
    locationStateFieldFilled: false,
    phoneFieldFilled: false,
  })
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [currentAmount, setCurrentAmount] = useState<number>(0)
  const countries = Country.getAllCountries()
  const [states, setStates] = useState([])
  const favPlayers = [
    'Rixon Wingrove',
    'Nikau Pouaka-Grego',
    'Nick Ward',
    'Curtis Mead',
    'Liam Spence',
    'Jordan McArdle',
    'Jack Partington',
    'Quincy Latimore',
    'Miguel Cienfeugos',
    'Josh Tols',
    'Alexander Wells',
    'Lachlan Wells',
    'Jack O’Loughlin',
    'Mitch Neunborn',
    'Jarod Large',
    'Riley Yeatman',
    'Luke Wilkins',
    'Jordy Grose',
    'Todd Van Steensel',
    'Jason Lott',
    'Adam McKillican',
  ]
  const fanLevels = [
    "Starter - I don't follow Giants",
    "Casual fan - I follow Giants, don't attend games",
    'Avid fan - I follow Giants, attend 2-3 games',
    "Super fan - I'm a member, attend most games",
    "Fanatic - I'm a member, attend all games",
  ]
  const [showRewardModal, setShowRewardModal] = useState({
    kudosAmount: 0,
    tokenAmount: 0,
    show: false,
  })
  const [success, setSuccesse] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const statesOfCountry = State.getStatesOfCountry(
      countries.find((item) => item.name === profileData.locationCountry)?.isoCode,
    )
    setStates(statesOfCountry)
  }, [])

  useEffect(() => {
    dispatch(getUserData())
    dispatch(getTeamData())
  }, [dispatch])

  useEffect(() => {
    let temp: UserData = JSON.parse(JSON.stringify(data))
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        temp[key] = data[key] === null ? '' : data[key]
      }
    }
    setProfileData(temp)
  }, [data])

  const loadData = useCallback(() => {
    dispatch(setLoading(true))
    getProfileRewardData().then((reward: RewardData) => {
      setRewardAmounts(reward)
      getProfileRewardStatus().then((status: RewardStatusData) => {
        setRewardStatus(status)
        let total: number = 0
        for (const rewardKey in reward) {
          if (Object.prototype.hasOwnProperty.call(reward, rewardKey)) {
            if (rewardKey.includes('Token')) {
              total += reward[rewardKey]
            }
          }
        }
        let amount: number = 0
        for (const statusKey in status) {
          if (Object.prototype.hasOwnProperty.call(status, statusKey)) {
            if (status[statusKey] && statusKey.includes('Filled')) {
              amount += reward[`${statusKey.slice(0, statusKey.length - 6)}TokenAmount`]
            }
          }
        }
        setTotalAmount(total)
        setCurrentAmount(amount)
        dispatch(setLoading(false))
      })
    })
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onChange = (type: string, value: string | number) => {
    setProfileData((prevState) => ({ ...prevState, [type]: value }))
  }

  const onChangeCountry = (value: string) => {
    onChange('locationCountry', value)
    const statesOfCountry = State.getStatesOfCountry(countries.find((item) => item.name === value)?.isoCode)
    setStates(statesOfCountry)
  }

  const handleSave = () => {
    let param = profileData

    dispatch(setLoading(true))
    const avatar = avatarRef?.current?.files[0]
    if (avatar) {
      const formData = new FormData()
      formData.append('file', avatar)
      uploadFile('avatars', formData)
        .then((res: any) => {
          param.avatar = res
          updateProfile(param)
            .then((res) => {
              setSuccesse(true)
              const { kudosAmount, tokenAmount } = res.reward
              if (kudosAmount > 0 || tokenAmount > 0) {
                setShowRewardModal({
                  kudosAmount,
                  tokenAmount,
                  show: true,
                })
              }
              dispatch(getUserData())
              dispatch(getTeamData())
              loadData()
            })
            .catch(() => {
              setErrorMessage('Failed to save your details.')
              dispatch(setLoading(false))
            })
        })
        .catch(() => {
          setErrorMessage('Failed to upload your avatar image.')
          dispatch(setLoading(false))
        })
    } else {
      updateProfile(param)
        .then((res: any) => {
          setSuccesse(true)
          const { kudosAmount, tokenAmount } = res.reward
          if (kudosAmount > 0 || tokenAmount > 0) {
            setShowRewardModal({
              kudosAmount,
              tokenAmount,
              show: true,
            })
          }
          dispatch(getUserData())
          dispatch(getTeamData())
          loadData()
        })
        .catch(() => {
          setErrorMessage('Failed to save your details.')
          dispatch(setLoading(false))
        })
    }
  }

  return (
    <div className="profile-page w-full sm:border border-sf-zinc-600 rounded-[4px]">
      <div className="avatar-section relative w-full rounded-t-[4px] py-32">
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/images/bg-with-spiral-curves.png')] bg-cover bg-center" />
        <div className="relative flex justify-center items-center">
          <button className="button-avatar-edit" onClick={() => avatarRef?.current?.click()}>
            <img src={profileData.avatar || '/assets/images/default-avatar.png'} className="w-120 h-120 rounded-full" />
            <span className="icon-avatar-edit right-12 bottom-px">
              <EditIcon />
            </span>
          </button>
          <input
            ref={avatarRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) {
                fileToDataUri(e.target.files[0]).then((dataUri) => onChange('avatar', dataUri))
              }
            }}
          />
        </div>
      </div>
      <div className="pt-20 pb-40">
        <div className="w-full sm:max-w-410 m-auto">
          <div className="bg-info rounded-[4px] border border-sf-zinc-600 px-18 py-16">
            <p className="text-14 text-sf-gray-300">Get {totalAmount} Extra Tokens</p>
            <p className="text-10 text-sf-zinc-400 font-poppins">When you update your profile 100%</p>
            <div className="w-full h-14" />
            <div className="relative w-full h-26">
              <div className="progress absolute w-full h-12 rounded-full top-[7px]" />
              <div className="relative flex items-center">
                <div
                  className="progress-bar h-10 rounded-full relative ml-2"
                  style={{ width: `${totalAmount === 0 ? 0 : Math.round((currentAmount / totalAmount) * 100)}%` }}
                />
                <div className="relative progression w-26 h-26 flex justify-center items-center rounded-full -ml-12">
                  <span className="text-8 text-white font-poppins">
                    {totalAmount === 0 ? 0 : Math.round((currentAmount / totalAmount) * 100)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between -mt-14">
              <div className="flex flex-col items-start">
                <div className="w-px h-16 border-l border-sf-zinc-600 border-dashed" />
                <span className="text-8 sm:w-42 text-sf-yellow-700 font-poppins mt-2">0</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-16 border-l border-sf-zinc-600 border-dashed" />
                <span className="hidden sm:block text-8 text-sf-yellow-700 font-poppins text-center mt-2">
                  +{Math.round(totalAmount / 4)} Token
                </span>
                <span className="sm:hidden text-8 text-sf-yellow-700 font-poppins mt-2">
                  +{Math.round(totalAmount / 4)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-16 border-l border-sf-zinc-600 border-dashed" />
                <span className="hidden sm:block w-70 text-8 text-sf-yellow-700 font-poppins text-center mt-2">
                  +{Math.round(totalAmount / 2)} Token
                </span>
                <span className="sm:hidden text-8 text-sf-yellow-700 font-poppins mt-2">
                  +{Math.round(totalAmount / 2)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-16 border-l border-sf-zinc-600 border-dashed" />
                <span className="hidden sm:block text-8 text-sf-yellow-700 font-poppins mt-2">
                  +{Math.round((totalAmount / 4) * 3)} Token
                </span>
                <span className="sm:hidden text-8 text-sf-yellow-700 font-poppins mt-2">
                  +{Math.round((totalAmount / 4) * 3)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <div className="w-px h-16 border-l border-sf-zinc-600 border-dashed" />
                <span className="hidden sm:block text-8 text-sf-yellow-700 font-poppins mt-2">
                  +{totalAmount} Token
                </span>
                <span className="sm:hidden text-8 text-sf-yellow-700 font-poppins mt-2">+{totalAmount}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-26" />
          <p className="text-14 text-sf-gray-300 font-bold">Indentity Information</p>
          <div className="w-full h-12" />
          <div className="grid xs:grid-cols-2 gap-10">
            <div>
              <label htmlFor="firstName" className="block mb-6 text-10 text-white/60 font-poppins">
                First Name
              </label>
              <input
                className="w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                type="text"
                id="firstName"
                placeholder="First Name"
                value={profileData.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <label htmlFor="lastName" className="block text-10 text-white/60 font-poppins">
                  Last Name
                </label>
                <div className="flex items-center">
                  <span
                    className={classNames(
                      'text-10 font-poppins',
                      rewardStatus.lastNameFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                    )}
                  >
                    {rewardStatus.lastNameFieldFilled ? 'You Won' : 'Fill & Earn'}
                  </span>
                  <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                  <span className="token-value text-12 leading-10">{rewardAmounts.lastNameFieldTokenAmount}</span>
                </div>
              </div>
              <input
                className="w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={profileData.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-12" />
          <div className="grid xs:grid-cols-2 gap-10">
            <div>
              <label htmlFor="userName" className="block text-10 text-white/60 font-poppins mb-6">
                Username
              </label>
              <input
                className="w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                type="text"
                id="userName"
                placeholder="UserName"
                value={profileData.userName}
                onChange={(e) => onChange('userName', e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <label htmlFor="birthday" className="block text-10 text-white/60 font-poppins">
                  Date of Birth
                </label>
                <div className="flex items-center">
                  <span
                    className={classNames(
                      'text-10 font-poppins',
                      rewardStatus.birthdayFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                    )}
                  >
                    {rewardStatus.birthdayFieldFilled ? 'You Won' : 'Fill & Earn'}
                  </span>
                  <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                  <span className="token-value text-12 leading-10">{rewardAmounts.birthdayFieldTokenAmount}</span>
                </div>
              </div>
              <input
                className="w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                type="text"
                id="birthday"
                placeholder="Date of Birth"
                value={profileData.birthday}
                onChange={(e) => onChange('birthday', e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-12" />
          <div>
            <div className="flex items-center mb-6">
              <label htmlFor="gender" className="block text-10 text-white/60 font-poppins">
                Select Gender
              </label>
              <div className="flex items-center ml-20">
                <span
                  className={classNames(
                    'text-10 font-poppins',
                    rewardStatus.genderFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                  )}
                >
                  {rewardStatus.genderFieldFilled ? 'You Won' : 'Fill & Earn'}
                </span>
                <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                <span className="token-value text-12 leading-10">{rewardAmounts.genderFieldTokenAmount}</span>
              </div>
            </div>
            <div id="gender" className="flex items-center">
              <label
                className="radiobox-container cursor-pointer relative text-12 text-sf-gray-300 font-poppins pl-28"
                onClick={() => onChange('gender', 'Male')}
              >
                Male
                <input
                  type="radio"
                  name="gender"
                  checked={profileData.gender === 'Male'}
                  value="Male"
                  onChange={() => onChange('gender', 'Male')}
                />
                <span className="checkmark absolute inset-0 bg-transparent rounded-full border border-sf-zinc-600 w-18 h-18" />
              </label>
              <label
                className="radiobox-container cursor-pointer relative text-12 text-sf-gray-300 font-poppins pl-28 ml-28"
                onClick={() => onChange('gender', 'Female')}
              >
                Female
                <input
                  type="radio"
                  name="gender"
                  checked={profileData.gender === 'Female'}
                  value="Female"
                  onChange={() => onChange('gender', 'Female')}
                />
                <span className="checkmark absolute inset-0 bg-transparent rounded-full border border-sf-zinc-600 w-18 h-18" />
              </label>
              <label
                className="radiobox-container cursor-pointer relative text-12 text-sf-gray-300 font-poppins pl-28 ml-28"
                onClick={() => onChange('gender', 'Other')}
              >
                Other
                <input
                  type="radio"
                  name="gender"
                  checked={profileData.gender === 'Other'}
                  value="Other"
                  onChange={() => onChange('gender', 'Other')}
                />
                <span className="checkmark absolute inset-0 bg-transparent rounded-full border border-sf-zinc-600 w-18 h-18" />
              </label>
            </div>
          </div>
          <div className="w-full h-26" />
          <p className="text-14 text-sf-gray-300 font-bold">Contact Details</p>
          <div className="w-full h-12" />
          <div>
            <label htmlFor="email" className="block text-10 text-white/60 font-poppins mb-6">
              Email Address
            </label>
            <div className="w-full h-36 flex justify-between bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 py-8">
              <input
                className="w-full bg-transparent rounded-[4px] text-12 leading-18 text-sf-gray-300 font-poppins"
                type="email"
                id="email"
                placeholder="Email Address"
                value={profileData.email}
                onChange={(e) => onChange('email', e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-12" />
          <div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="phone" className="block text-10 text-white/60 font-poppins">
                Phone Number
              </label>
              <div className="flex items-center">
                <span
                  className={classNames(
                    'text-10 font-poppins',
                    rewardStatus.phoneFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                  )}
                >
                  {rewardStatus.phoneFieldFilled ? 'You Won' : 'Fill & Earn'}
                </span>
                <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                <span className="token-value text-12 leading-10">{rewardAmounts.phoneFieldTokenAmount}</span>
              </div>
            </div>
            <div className="w-full h-36 flex justify-between bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 py-8">
              <PhoneInput
                specialLabel={''}
                country={'au'}
                inputStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
                countryCodeEditable={true}
                value={profileData.phone}
                onChange={(value) => onChange('phone', value)}
              />
            </div>
          </div>
          <div className="w-full h-12" />
          <div className="grid xs:grid-cols-2 gap-10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <label htmlFor="locationCountry" className="block text-10 text-white/60 font-poppins">
                  Country
                </label>
                <div className="flex items-center">
                  <span
                    className={classNames(
                      'text-10 font-poppins',
                      rewardStatus.locationCountryFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                    )}
                  >
                    {rewardStatus.locationCountryFieldFilled ? 'You Won' : 'Fill & Earn'}
                  </span>
                  <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                  <span className="token-value text-12 leading-10">
                    {rewardAmounts.locationCountryFieldTokenAmount}
                  </span>
                </div>
              </div>
              <Listbox value={profileData.locationCountry} onChange={(value) => onChangeCountry(value)}>
                <div className="relative mt-1">
                  <Listbox.Button
                    id="locationCountry"
                    className="relative w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins cursor-pointer"
                  >
                    <span className="block truncate text-left">
                      {countries.find((item) => item.name === profileData.locationCountry)?.name || 'Select'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12">
                      <TriangleIcon />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-4 max-h-120 w-full overflow-auto rounded-[4px] bg-dark py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      {countries.map((item) => (
                        <Listbox.Option
                          key={`country-item-${item.name}`}
                          className={({ active }) =>
                            classNames(
                              'relative cursor-default select-none py-4 px-12 text-12 leading-18 font-poppins',
                              active ? 'opacity-80' : '',
                            )
                          }
                          value={item.name}
                        >
                          {({ selected }) => (
                            <span
                              className={classNames(
                                'block truncate',
                                selected ? 'text-sf-green-400' : 'text-sf-gray-300',
                              )}
                            >
                              {item.name}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <label htmlFor="locationState" className="block text-10 text-white/60 font-poppins">
                  State/Proviance
                </label>
                <div className="flex items-center">
                  <span
                    className={classNames(
                      'text-10 font-poppins',
                      rewardStatus.locationStateFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                    )}
                  >
                    {rewardStatus.locationStateFieldFilled ? 'You Won' : 'Fill & Earn'}
                  </span>
                  <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                  <span className="token-value text-12 leading-10">{rewardAmounts.locationStateFieldTokenAmount}</span>
                </div>
              </div>
              <Listbox value={profileData.locationState} onChange={(value) => onChange('locationState', value)}>
                <div className="relative mt-1">
                  <Listbox.Button
                    id="locationState"
                    className="relative w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins cursor-pointer"
                  >
                    <span className="block truncate text-left">
                      {states.find((item) => item.name === profileData.locationState)?.name || 'Select'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12">
                      <TriangleIcon />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-4 max-h-120 w-full overflow-auto rounded-[4px] bg-dark py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      {states.map((item) => (
                        <Listbox.Option
                          key={`state-item-${item.name}`}
                          className={({ active }) =>
                            classNames(
                              'relative cursor-default select-none py-4 px-12 text-12 leading-18 font-poppins',
                              active ? 'opacity-80' : '',
                            )
                          }
                          value={item.name}
                        >
                          {({ selected }) => (
                            <span
                              className={classNames(
                                'block truncate',
                                selected ? 'text-sf-green-400' : 'text-sf-gray-300',
                              )}
                            >
                              {item.name}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full h-12" />
          <div className="grid xs:grid-cols-2 gap-10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <label htmlFor="locationCity" className="block text-10 text-white/60 font-poppins">
                  City
                </label>
                <div className="flex items-center">
                  <span
                    className={classNames(
                      'text-10 font-poppins',
                      rewardStatus.locationCityFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                    )}
                  >
                    {rewardStatus.locationCityFieldFilled ? 'You Won' : 'Fill & Earn'}
                  </span>
                  <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                  <span className="token-value text-12 leading-10">{rewardAmounts.locationCityFieldTokenAmount}</span>
                </div>
              </div>
              <input
                className="w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                type="text"
                id="locationCity"
                placeholder="City"
                value={profileData.locationCity}
                onChange={(e) => onChange('locationCity', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="locationPostcode" className="block text-10 text-white/60 font-poppins mb-6">
                Postcode
              </label>
              <input
                className="w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins"
                type="text"
                id="locationPostcode"
                placeholder="Postcode"
                value={profileData.locationPostcode}
                onChange={(e) => onChange('locationPostcode', e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-26" />
          <p className="text-14 text-sf-gray-300 font-bold">Your Fan Details</p>
          <div className="w-full h-12" />
          <div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="favPlayer" className="block text-8 text-white/60 font-poppins">
                Team's favorite player
              </label>
              <div className="flex items-center">
                <span
                  className={classNames(
                    'text-10 font-poppins',
                    rewardStatus.favPlayerFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                  )}
                >
                  {rewardStatus.favPlayerFieldFilled ? 'You Won' : 'Fill & Earn'}
                </span>
                <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                <span className="token-value text-12 leading-10">{rewardAmounts.favPlayerFieldTokenAmount}</span>
              </div>
            </div>
            <Listbox value={profileData.favPlayer} onChange={(value) => onChange('favPlayer', value)}>
              <div className="relative mt-1">
                <Listbox.Button
                  id="favPlayer"
                  className="relative w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins cursor-pointer"
                >
                  <span className="block truncate text-left">
                    {favPlayers.find((item) => item === profileData.favPlayer) || 'Select'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12">
                    <TriangleIcon />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-4 max-h-120 w-full overflow-auto rounded-[4px] bg-dark py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    {favPlayers.map((item) => (
                      <Listbox.Option
                        key={`favPlayer-item-${item}`}
                        className={({ active }) =>
                          classNames(
                            'relative cursor-default select-none py-4 px-12 text-12 leading-18 font-poppins',
                            active ? 'opacity-80' : '',
                          )
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <span
                            className={classNames(
                              'block truncate',
                              selected ? 'text-sf-green-400' : 'text-sf-gray-300',
                            )}
                          >
                            {item}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="w-full h-12" />
          <div>
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="fanType" className="block text-10 text-white/60 font-poppins">
                I am a
              </label>
              <div className="flex items-center">
                <span
                  className={classNames(
                    'text-10 font-poppins',
                    rewardStatus.fanTypeFieldFilled ? 'text-sf-green-500' : 'text-sf-rose-300',
                  )}
                >
                  {rewardStatus.fanTypeFieldFilled ? 'You Won' : 'Fill & Earn'}
                </span>
                <img src="/assets/images/token.svg" alt="" className="h-12 mx-4" />
                <span className="token-value text-12 leading-10">{rewardAmounts.fanTypeFieldTokenAmount}</span>
              </div>
            </div>
            <Listbox value={profileData.fanType} onChange={(value) => onChange('fanType', value)}>
              <div className="relative mt-1">
                <Listbox.Button
                  id="fanType"
                  className="relative w-full h-36 bg-transparent border border-sf-zinc-600 rounded-[4px] px-12 text-12 leading-18 text-sf-gray-300 font-poppins cursor-pointer"
                >
                  <span className="block truncate text-left">
                    {fanLevels.find((item) => item === profileData.fanType) || 'Select'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12">
                    <TriangleIcon />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-4 max-h-120 w-full overflow-auto rounded-[4px] bg-dark py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    {fanLevels.map((item) => (
                      <Listbox.Option
                        key={`fanLevel-item-${item}`}
                        className={({ active }) =>
                          classNames(
                            'relative cursor-default select-none py-4 px-12 text-12 leading-18 font-poppins',
                            active ? 'opacity-80' : '',
                          )
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <span
                            className={classNames(
                              'block truncate',
                              selected ? 'text-sf-green-400' : 'text-sf-gray-300',
                            )}
                          >
                            {item}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          {success ? (
            <>
              <div className="w-full h-20" />
              <p className="text-12 text-sf-green-500 font-poppins">Your details have been updated successfully.</p>
            </>
          ) : null}
          {!!errorMessage ? (
            <>
              <div className="w-full h-20" />
              <p className="text-12 text-sf-rose-700 font-poppins">{errorMessage}</p>
            </>
          ) : null}
          <div className="w-full h-30" />
          <button
            className="w-140 h-36 bg-danger rounded-[4px] text-14 text-white uppercase block m-auto"
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
      <RewardModal
        show={showRewardModal.show}
        kudosAmount={showRewardModal.kudosAmount}
        tokenAmount={showRewardModal.tokenAmount}
        onClose={() => setShowRewardModal((prevState) => ({ ...prevState, show: false }))}
      />
    </div>
  )
}

export default Profile
