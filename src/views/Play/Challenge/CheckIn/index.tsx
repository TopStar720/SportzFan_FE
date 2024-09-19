import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import InviteModal from 'views/Play/components/InviteModal'
import InviteSuccessModal from 'views/Play/components/InviteSuccessModal'
import DetailsSection from './components/DetailsSection'
import ConfirmModal from './components/ConfirmModal'
import SuccessModal from './components/SuccessModal'
import { CheckInTypeEnum } from './types'
import { getChallengeCheckIn, getPlayCheckIn, getTwoDistance, playCheckIn } from 'apis/challenge'
import { dateToDateAndTime } from 'utils'
import { useAppSelector } from 'hooks'

const CheckIn = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useAppSelector((state) => state.user)

  const [checkInType, setCheckIntype] = useState<CheckInTypeEnum>(CheckInTypeEnum.Inside)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [showInviteSuccessModal, setInviteSuccessModal] = useState<boolean>(false)

  const [playedStatus, setPlayedStatus] = useState(false)
  const [enabledGeoLocation, setEnabledGeoLocation] = useState(false)
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 })
  const [venueCoords, setVenueCoords] = useState({ latitude: 0, longitude: 0 })
  const [distance, setDistance] = useState(0)

  const [challenge, setChallenge] = useState({
    title: '',
    description: '',
    match: { venueTitle: '', homeTeam: { logo: '' }, awayTeam: { logo: '' }, startDate: '', startTime: '' },
    kudosReward: 0,
    tokenReward: 0,
    outKudosReward: 0,
    outTokenReward: 0,
    eligbleToken: 0,
    eligbleKudos: 0,
    isUpcoming: false,
    isEnded: false,
    isExpired: false,
  })

  const getCheckIn = async (id: string) => {
    const data = await getChallengeCheckIn(id)
    data.isUpcoming = data.start > new Date().toISOString()
    data.isExpired = data.end < new Date().toISOString()

    const startDateTime = dateToDateAndTime(new Date(data.start))
    const endDateTime = dateToDateAndTime(new Date(data.end))
    const matchStart = dateToDateAndTime(new Date(data.match.start), 1)

    data.start = `${startDateTime.time} ${startDateTime.date}`
    data.end = `${endDateTime.time} ${endDateTime.date}`
    data.match.startDate = matchStart.date
    data.match.startTime = matchStart.time

    const matchVenuCoords = data.match.venueGoogleCoordinates.split(',')
    setVenueCoords({ latitude: Number(matchVenuCoords[0]), longitude: Number(matchVenuCoords[1]) })
    setChallenge(data)
  }

  const getPlayData = async (id: string) => {
    const playData = await getPlayCheckIn(id)
    if (playData?.playCheckIn?.length > 0) {
      if (playData.playCheckIn.map((d: { userId: string }) => d.userId).includes(data.id)) {
        setPlayedStatus(true)
      } else {
        setPlayedStatus(false)
      }
    } else {
      setPlayedStatus(false)
    }
  }

  const getDistance = async () => {
    const dis = await getTwoDistance({
      lat1: coords.latitude,
      lng1: coords.longitude,
      lat2: venueCoords.latitude,
      lng2: venueCoords.longitude,
    })
    if (dis) {
      setDistance(Number(dis))
    }
  }

  useEffect(() => {
    if (id) {
      getCheckIn(String(id))
    }
  }, [id])

  useEffect(() => {
    getPlayData(String(id))
  }, [id, data])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setEnabledGeoLocation(true)
        setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      },
      function (error) {
        setEnabledGeoLocation(false)
      },
    )
  }, [])

  useEffect(() => {
    if (coords.latitude !== 0 && coords.longitude !== 0 && venueCoords.latitude !== 0 && venueCoords.longitude !== 0) {
      getDistance()
    }
  }, [coords, venueCoords])

  const onConfirm = async () => {
    setShowConfirmModal(false)
    try {
      const data = await playCheckIn({
        checkInId: String(id),
        location: checkInType === CheckInTypeEnum.Inside ? 0 : 1,
        userCoordinates: `${coords.latitude},${coords.longitude}`,
      })
      setPlayedStatus(true)
      setShowSuccessModal(true)
    } catch {}
  }

  const onInvite = () => {
    setShowSuccessModal(false)
    setTimeout(() => {
      setShowInviteModal(true)
    }, 100)
  }

  const handleInvite = (users: string[]) => {
    setShowInviteModal(false)
    setTimeout(() => {
      setInviteSuccessModal(true)
    }, 100)
  }

  return (
    <Fragment>
      <Head>
        <title>{`${challenge?.title} | AG Nation`}</title>
      </Head>
      <DetailsSection data={challenge} />
      <div className="md:px-26">
        <p className="text-14 text-sf-neutral-300 font-poppins leading-20 my-20">{challenge?.description}</p>
        <div className="xl:w-fit bg-dark rounded-[5px] px-24 py-22">
          <div className="flex flex-col xl:flex-row justify-center items-center">
            <div className="flex items-center">
              <img src={challenge?.match?.homeTeam?.logo} alt="" className="h-30" />
              <img src="/assets/images/vs-yellow.svg" alt="" className="h-30 mx-14" />
              <img src={challenge?.match?.awayTeam?.logo} alt="" className="h-32" />
            </div>
            <div className="w-px hidden xl:block h-30 bg-white/50 mx-20" />
            <div className="flex flex-col-reverse xl:flex-row items-center">
              <div className="flex flex-row xl:flex-col items-center">
                <span className="hidden xl:block text-10 leading-20 text-sf-zinc-400 font-poppins">Venue</span>
                <span className="xl:hidden text-10 leading-20 text-sf-zinc-400 font-poppins mr-4">Venue:</span>
                <span className="text-12 leading-18 text-sf-yellow-700 font-poppins">
                  {challenge?.match?.venueTitle}
                </span>
              </div>
              <div className="w-px hidden xl:block h-30 bg-white/50 mx-20" />
              <div className="flex items-center mt-16 mb-6 xl:m-0">
                <div className="flex flex-row xl:flex-col items-center">
                  <span className="hidden xl:block text-10 leading-20 text-sf-zinc-400 font-poppins">Date</span>
                  <span className="xl:hidden text-10 leading-20 text-sf-zinc-400 font-poppins mr-4">Date:</span>
                  <span className="text-12 leading-18 text-sf-yellow-700 font-poppins">
                    {challenge?.match?.startDate}
                  </span>
                </div>
                <div className="w-px h-16 xl:h-30 bg-white/50 mx-12 xl:mx-20" />
                <div className="flex flex-row xl:flex-col items-center">
                  <span className="hidden xl:block text-10 leading-20 text-sf-zinc-400 font-poppins">Time</span>
                  <span className="xl:hidden text-10 leading-20 text-sf-zinc-400 font-poppins mr-4">Time:</span>
                  <span className="text-12 leading-18 text-sf-yellow-700 font-poppins">
                    {challenge?.match?.startTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!enabledGeoLocation ? (
          <Fragment>
            <div className="w-full h-10" />
            <div className="xl:w-fit rounded-[5px] px-24 py-22">
              <div className="flex flex-col justify-center items-center text-center">
                <span className="text-24 text-sf-rose-700">Geolocation is disabled in this browser</span>
                <Link href={`/play`}>
                  <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-24 py-8 my-14">
                    <span className="text-14 text-white uppercase leading-18">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </Fragment>
        ) : playedStatus ? (
          <Fragment>
            <div className="w-full h-10" />
            <div className="xl:w-fit rounded-[5px] px-24 py-22">
              <div className="flex flex-col justify-center items-center text-center">
                <span className="text-24 text-sf-rose-700">You have checked in to this event</span>
                <Link href={`/play`}>
                  <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-24 py-8 my-14">
                    <span className="text-14 text-white uppercase leading-18">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </Fragment>
        ) : challenge.isEnded || challenge.isExpired ? (
          <Fragment>
            <div className="w-full h-10" />
            <div className="xl:w-fit rounded-[5px] px-24 py-22">
              <div className="flex flex-col justify-center items-center text-center">
                <span className="text-24 text-sf-rose-700">This challenge has ended</span>
                <Link href={`/play`}>
                  <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-24 py-8 my-14">
                    <span className="text-14 text-white uppercase leading-18">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </Fragment>
        ) : data.kudosAmount < challenge.eligbleKudos ? (
          <div className="xl:w-fit border border-sf-yellow-600 bg-warning rounded-[5px] px-24 py-22 mt-20">
            <div className="flex flex-col justify-center items-center text-center gap-10">
              <img src="/assets/images/lock.svg" />
              <span className="text-16 text-sf-yellow-300 md:w-500">
                You need {challenge.eligbleKudos - data.kudosAmount} more kudos to check in. You have to earn kudos
              </span>
              <Link href={`/play`}>
                <button className="w-full sm:w-fit bg-danger rounded-[4px] px-72 py-8">
                  <span className="text-14 text-white uppercase leading-18">Earn</span>
                </button>
              </Link>
              <Link href={`/play`}>
                <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-72 py-8">
                  <span className="text-14 text-white uppercase leading-18">Back</span>
                </button>
              </Link>
            </div>
          </div>
        ) : data.tokenAmount < challenge.eligbleToken ? (
          <div className="xl:w-fit border border-sf-yellow-600 bg-warning rounded-[5px] px-24 py-22 mt-20">
            <div className="flex flex-col justify-center items-center text-center gap-10">
              <img src="/assets/images/lock.svg" />
              <span className="text-16 text-sf-yellow-300 md:w-500">
                You need {challenge.eligbleKudos - data.tokenAmount} more tokens to check in. You have to earn or buy
                tokens
              </span>
              <div className="flex gap-4">
                <Link href={`/play`}>
                  <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-26 py-8">
                    <span className="text-14 text-white uppercase leading-18">Earn</span>
                  </button>
                </Link>
                <Link href={`/wallet`}>
                  <button className="w-full sm:w-fit bg-danger rounded-[4px] px-26 py-8">
                    <span className="text-14 text-white uppercase leading-28">Buy</span>
                  </button>
                </Link>
              </div>
              <Link href={`/play`}>
                <button className="w-full sm:w-fit bg-secondary rounded-[4px] px-72 py-8">
                  <span className="text-14 text-white uppercase leading-18">Back</span>
                </button>
              </Link>
            </div>
          </div>
        ) : distance <= 500 ? (
          <Fragment>
            <div className="w-full h-10" />
            <div className="xl:w-fit border border-sf-zinc-600 bg-info rounded-[5px] px-24 py-22">
              <div className="flex flex-col xl:flex-row justify-center items-center text-center">
                <span className="text-sf-gray-300">You are Inside the stadium</span>
                <div className="flex justify-center items-center mt-10 mb-20 xl:my-0 xl:ml-50 xl:mr-18">
                  <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
                    <img src="/assets/images/decoration.svg" alt="" className="h-28" />
                    <div className="flex flex-col justify-between ml-12">
                      <span className="point-name text-8">Earn Kudos</span>
                      <span className="point-value font-bold text-24">{challenge?.kudosReward}</span>
                    </div>
                  </div>
                  <div className="w-px h-40 bg-white/50 ml-10 mr-20"></div>
                  <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
                    <img src="/assets/images/token.svg" alt="" className="h-28" />
                    <div className="flex flex-col justify-between ml-12">
                      <span className="token-name text-8">Earn Token</span>
                      <span className="token-value font-bold text-24">{challenge?.tokenReward}</span>
                    </div>
                  </div>
                </div>
                <button
                  disabled={data.tokenAmount < challenge.eligbleToken || challenge.isUpcoming}
                  className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8"
                  onClick={() => {
                    setCheckIntype(CheckInTypeEnum.Inside)
                    setShowConfirmModal(true)
                  }}
                >
                  <span className="text-14 text-white uppercase leading-18">Check In</span>
                </button>
              </div>
            </div>
          </Fragment>
        ) : distance > 500 ? (
          <Fragment>
            <div className="w-full h-10" />
            <div className="xl:w-fit border border-sf-zinc-600 bg-info rounded-[5px] px-24 py-22">
              <div className="flex flex-col xl:flex-row justify-center items-center text-center">
                <span className="text-sf-gray-300">You are outside the stadium</span>
                <div className="flex justify-center items-center mt-10 mb-20 xl:my-0 xl:ml-38 xl:mr-18">
                  <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
                    <img src="/assets/images/decoration.svg" alt="" className="h-28" />
                    <div className="flex flex-col justify-between ml-12">
                      <span className="point-name text-8">Earn Kudos</span>
                      <span className="point-value font-bold text-24">{challenge?.outKudosReward}</span>
                    </div>
                  </div>
                  <div className="w-px h-40 bg-white/50 ml-10 mr-20"></div>
                  <div className="flex items-center drop-shadow-[0_0_12px_rgba(204,143,0,1)]">
                    <img src="/assets/images/token.svg" alt="" className="h-28" />
                    <div className="flex flex-col justify-between ml-12">
                      <span className="token-name text-8">Earn Token</span>
                      <span className="token-value font-bold text-24">{challenge?.outTokenReward}</span>
                    </div>
                  </div>
                </div>
                <button
                  disabled={data.tokenAmount < challenge.eligbleToken || challenge.isUpcoming}
                  className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 "
                  onClick={() => {
                    setCheckIntype(CheckInTypeEnum.Outside)
                    setShowConfirmModal(true)
                  }}
                >
                  <span className="text-14 text-white uppercase leading-18">Check In</span>
                </button>
              </div>
              <div className="flex mt-20 justify-center items-center text-center">
                <span className="text-sf-gray-300 text-13 text-center">
                  HINT: Get closer to the stadium and refresh your page. <br /> You will earn more rewards for being at
                  the event!
                </span>
              </div>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </div>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        type={checkInType}
        data={challenge}
        onConfirm={onConfirm}
      />
      <SuccessModal
        show={showSuccessModal}
        data={challenge}
        checkInType={checkInType}
        onClose={() => {
          setShowSuccessModal(false)
        }}
        onInvite={onInvite}
      />
      <InviteModal
        show={showInviteModal}
        onClose={() => {
          setShowInviteModal(false)
          setPlayedStatus(true)
        }}
        onInvite={handleInvite}
      />
      <InviteSuccessModal show={showInviteSuccessModal} onClose={() => setInviteSuccessModal(false)} type="challenge" />
    </Fragment>
  )
}

export default CheckIn
