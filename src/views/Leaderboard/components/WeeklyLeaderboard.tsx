import { Fragment, useCallback, useEffect, useState } from 'react'
import { getLeaderboardDetailed } from 'apis/user'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { dateToDateAndTime } from 'utils'
import { LeaderboardData, LeaderboardTypeEnum } from '../types'
import LeaderboardTable from './LeaderboardTable'

const WeeklyLeaderboard = () => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<LeaderboardData[]>([])
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const loadData = useCallback(() => {
    if (start !== '' && end !== '') {
      let tempEnd = end
      const now = new Date().toISOString()
      if (now < end && start < now) {
        tempEnd = now
      }
      dispatch(setLoading(true))
      getLeaderboardDetailed(LeaderboardTypeEnum.Weekly, 0, 10, { start: start, end: tempEnd }).then(
        (res: LeaderboardData[]) => {
          setData(res)
          dispatch(setLoading(false))
        },
      )
    }
  }, [dispatch, start, end])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    const beforeOneWeek = new Date(new Date().getTime())
    const day = beforeOneWeek.getDay()
    const diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
    const thisMonday = new Date(beforeOneWeek.setDate(diffToMonday)).toISOString()
    const thisSunday = new Date(new Date(thisMonday).setDate(new Date(thisMonday).getDate() + 6)).toISOString()
    setStart(thisMonday)
    setEnd(thisSunday)
  }, [])

  const handleNextWeek = () => {
    const nextStart = new Date(new Date(start).setDate(new Date(start).getDate() + 7)).toISOString()
    const nextEnd = new Date(new Date(start).setDate(new Date(start).getDate() + 13)).toISOString()
    setStart(nextStart)
    setEnd(nextEnd)
  }

  const handlePrevWeek = () => {
    const prevStart = new Date(new Date(start).setDate(new Date(start).getDate() - 7)).toISOString()

    const prevEnd = new Date(new Date(start).setDate(new Date(start).getDate() - 1)).toISOString()
    setStart(prevStart)
    setEnd(prevEnd)
  }

  return (
    <Fragment>
      <div className="flex mb-3 text-sf-zinc-400 items-center  text-10 xs:text-12 font-poppins">
        <button className="px-6 py-6 text-20 flex" onClick={handlePrevWeek}>
          {' '}
          {'<'}{' '}
        </button>
        {start !== '' && end !== '' && (
          <span>
            {`${dateToDateAndTime(new Date(start), 2).date}`} - {`${dateToDateAndTime(new Date(end), 2).date}`}
            {new Date().toISOString() <= end && new Date().toISOString() >= start ? ' (current)' : ''}
          </span>
        )}
        <button className="px-6 py-6 text-20" onClick={handleNextWeek}>
          {'>'}
        </button>
      </div>
      <LeaderboardTable data={data} />
    </Fragment>
  )
}

export default WeeklyLeaderboard
