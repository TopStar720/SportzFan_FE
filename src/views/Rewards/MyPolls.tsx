import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { getMyPollList } from 'apis/poll'
import { Poll } from 'views/Play/Poll/types'
import MyPollDetailsCard from 'views/Play/components/MyPollDetailsCard'

const MyPolls = () => {
  const dispatch = useAppDispatch()
  const [polls, setPolls] = useState<Poll[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [page, setPage] = useState(0)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getMyPollList(page * rowsPerPage, rowsPerPage)
      .then((res) => {
        const { count, data } = res
        const temp = [...polls]
        setPolls(temp.concat(data))
        setTotalCount(count)
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setLoading(false))
      })
  }, [dispatch, page, rowsPerPage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Fragment>
      <div className="flex items-center">
        <img src="/assets/images/chart-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">My Polls</p>
      </div>
      <div className="w-full h-14" />
      {polls.length > 0 ? (
        <>
          {polls.map((item) => (
            <MyPollDetailsCard key={`poll-item-${item.id}`} {...item} />
          ))}

          <div className="w-full h-20" />
          <button
            disabled={totalCount <= rowsPerPage * (page + 1)}
            onClick={() => setPage((prev) => prev + 1)}
            className="w-full sm:w-fit bg-danger rounded-[4px] px-24 py-8 mt-4"
          >
            <span className="text-14 text-white uppercase leading-18">View More</span>
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center bg-secondary-light rounded-[4px] border border-sf-zinc-600 px-20 py-52">
          <img src="/assets/images/chart-yellow.svg" alt="" className="h-74" />
          <div className="w-full h-20" />
          <p className="max-w-378 text-14 text-sf-neutral-300 font-poppins text-center">
            You have no active polls in play. Click below to view what polls you can participate in
          </p>
          <div className="w-full h-30" />
          <Link href={`/play/poll/all`}>
            <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-20 py-10">
              View Polls
            </button>
          </Link>
        </div>
      )}
    </Fragment>
  )
}

export default MyPolls
