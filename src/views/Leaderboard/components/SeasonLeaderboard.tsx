import { Fragment, useCallback, useEffect, useState } from 'react'
import { getLeaderboardDetailed } from 'apis/user'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { LeaderboardData, LeaderboardTypeEnum } from '../types'
import LeaderboardTable from './LeaderboardTable'

const SeasonLeaderboard = () => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<LeaderboardData[]>([])

  const loadData = useCallback(() => {
    dispatch(setLoading(true))
    getLeaderboardDetailed(LeaderboardTypeEnum.Season).then((res: LeaderboardData[]) => {
      setData(res)
      dispatch(setLoading(false))
    })
  }, [dispatch])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Fragment>
      <LeaderboardTable data={data} />
    </Fragment>
  )
}

export default SeasonLeaderboard
