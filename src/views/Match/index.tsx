import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import GameDetailsCard from 'views/Play/components/GameDetailsCard'
import ChallengeDetailsCard from 'views/Play/components/ChallengeDetailsCard'
import PollDetailsCard from 'views/Play/components/PollDetailsCard'
import { GameData, ChallengeData, ChallengeTypeEnum } from 'views/Play/types'
import { Poll } from 'views/Play/Poll/types'
import { useRouter } from 'next/router'
import { dateToDateAndTime } from 'utils'
import { getMatchData } from 'apis/match'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getGames } from 'store/games'
import { getChallenges } from 'store/challenges'
import { getPolls } from 'store/polls'

const Match = () => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useAppDispatch()

  const [checkInId, setCheckInId] = useState('')
  const [games, setGames] = useState<GameData[]>([])
  const [challenges, setChallenges] = useState<ChallengeData[]>([])
  const [polls, setPolls] = useState<Poll[]>([])

  const [match, setMatch] = useState({
    title: '',
    homeTeam: { logo: '' },
    awayTeam: { logo: '' },
    start: '',
  })

  const getMatch = async (id: string) => {
    try {
      const data = await getMatchData(id)
      const tempMatch = data?.match
      const startDateTime = dateToDateAndTime(new Date(tempMatch.start), 1)
      const endDateTime = dateToDateAndTime(new Date(tempMatch.end))

      tempMatch.start = `${startDateTime.date}, ${startDateTime.time} `
      tempMatch.end = `${endDateTime.date}, ${endDateTime.time} `

      const tempCheckIn = data.challenges.data.find((d) => d.type === ChallengeTypeEnum.CheckIn)
      if (tempCheckIn) {
        setCheckInId(tempCheckIn.id)
      }

      setMatch(tempMatch)
      setGames(data.games.data)
      setChallenges(data.challenges.data)
      setPolls(data.polls.data)
    } catch {}
  }

  useEffect(() => {
    if (id) {
      getMatch(String(id))
      dispatch(getGames())
      dispatch(getChallenges())
      dispatch(getPolls())
    }
  }, [id])

  return (
    <Fragment>
      <div className="border border-sf-zinc-600 bg-info rounded-[4px] relative overflow-hidden">
        <img src="/assets/images/bg-with-spiral-curves.png" alt="" className="absolute inset-0 w-full h-full" />
        <div className="absolute w-full h-full flex justify-center items-center xl:justify-end">
          <img src="/assets/images/prize-yellow-light.svg" alt="" className="h-120 xl:mr-50" />
        </div>
        <div className="relative flex flex-col items-center xl:items-start text-center xl:text-left px-20 sm:px-30 py-24 xl:pt-30">
          <div className="flex items-center">
            <img src={match?.homeTeam?.logo} alt="" className="h-40" />
            <img src="/assets/images/vs-yellow.svg" alt="" className="h-46 md:h-36 xl:h-46 mx-20" />
            <img src={match?.awayTeam?.logo} alt="" className="h-40" />
          </div>
          <div className="w-full h-26" />
          <p className="text-20 sm:text-24 text-sf-gray-300 font-bold">{match?.title}</p>
          <p className="text-18 text-sf-gray-300">{match?.start}</p>
          <div className="w-full h-20" />
          {checkInId !== '' ? (
            <Link href={`/play/challenge/check-in/${checkInId}`}>
              <button className="w-150 h-40 bg-danger rounded-[4px]">
                <span className="text-14 text-white uppercase">Check-in</span>
              </button>
            </Link>
          ) : (
            <button disabled className="w-150 h-40 bg-danger rounded-[4px]">
              <span className="text-14 text-white uppercase">Check-in</span>
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-30" />
      <div className="flex items-center">
        <img src="/assets/images/balls-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Games</p>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Play interactive trivia, predictor and mini games to win rewards
      </p>
      <div className="w-full h-16" />
      {games.map((item) => (
        <GameDetailsCard key={`game-item-${item.id}`} {...item} />
      ))}
      <div className="w-full h-30" />
      <div className="flex items-center">
        <img src="/assets/images/handshake-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Challenges</p>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Complete challenges to build your fan rating and grow your collection of achievement badges.
      </p>
      <div className="w-full h-16" />
      {challenges.map((item) => (
        <ChallengeDetailsCard key={`challenge-item-${item.id}`} {...item} />
      ))}
      <div className="w-full h-30" />
      <div className="flex items-center">
        <img src="/assets/images/chart-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">Polls</p>
      </div>
      <p className="text-12 text-sf-zinc-400 font-poppins leading-20 mt-4">
        Vote on team decisions and have your voice heard.
      </p>
      <div className="w-full h-16" />
      {polls.map((item) => (
        <PollDetailsCard key={`poll-item-${item.id}`} {...item} />
      ))}
    </Fragment>
  )
}

export default Match
