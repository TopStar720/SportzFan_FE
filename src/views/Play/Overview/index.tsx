import { useEffect } from 'react'
import ChallengesSection from './ChallengesSection'
import GamesSection from './GamesSection'
import PollsSection from './PollsSection'
import { useAppDispatch } from 'hooks'
import { getGames } from 'store/games'
import { getChallenges } from 'store/challenges'
import { getPolls } from 'store/polls'

const Overview = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getGames())
    dispatch(getChallenges())
    dispatch(getPolls())
  }, [dispatch])

  return (
    <div className="py-10">
      <GamesSection />
      <div className="w-full h-40" />
      <ChallengesSection />
      <div className="w-full h-40" />
      <PollsSection />
    </div>
  )
}

export default Overview
