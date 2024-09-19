import { Fragment, useCallback, useEffect, useState } from 'react'
import { getLeaderboardDetailed } from 'apis/user'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { GameTypeEnum } from 'views/Play/types'
import { LeaderboardData, LeaderboardTypeEnum } from '../types'
import LeaderboardTable from './LeaderboardTable'

const GameLeaderboard = () => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<LeaderboardData[]>([])
  const [filter, setFilter] = useState(GameTypeEnum.Trivia)

  const loadData = useCallback(() => {
    if (filter !== GameTypeEnum.MiniGame) {
      dispatch(setLoading(true))
      getLeaderboardDetailed(LeaderboardTypeEnum.Games, 0, 10, { filter: filter }).then((res: LeaderboardData[]) => {
        setData(res)
        dispatch(setLoading(false))
      })
    }
  }, [dispatch, filter])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Fragment>
      <div className="flex mb-3 text-sf-zinc-400">
        <button
          className={`px-8 xs:px-20 py-6 xs:py-10 text-10 xs:text-12 leading-14 uppercase ${
            filter === GameTypeEnum.Trivia ? 'border-b-2 border-sf-zinc-600' : ''
          }`}
          onClick={() => setFilter(GameTypeEnum.Trivia)}
        >
          Trivia
        </button>
        <button
          className={`px-8 xs:px-20 py-6 xs:py-10 text-10 xs:text-12 leading-14 uppercase ${
            filter === GameTypeEnum.Predict ? 'border-b-2 border-sf-zinc-600' : ''
          }`}
          onClick={() => setFilter(GameTypeEnum.Predict)}
        >
          Predictor
        </button>
        <button
          className={`px-8 xs:px-20 py-6 xs:py-10 text-10 xs:text-12 leading-14 uppercase ${
            filter === GameTypeEnum.MiniGame ? 'border-b-2 border-sf-zinc-600' : ''
          }`}
          onClick={() => setFilter(GameTypeEnum.MiniGame)}
        >
          Mini Games
        </button>
      </div>
      {filter === GameTypeEnum.MiniGame ? (
        <div className="text-sf-yellow-700 text-12 sm:text-14 px-10 sm:px-18">Mini Games Leaderboard Coming Soon</div>
      ) : (
        <LeaderboardTable data={data} />
      )}
    </Fragment>
  )
}

export default GameLeaderboard
