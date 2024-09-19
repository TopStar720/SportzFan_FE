import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import MyChallengeCard from './components/MyChallengeCard'
import { getMyChallengeList } from 'apis/challenge'
import { useAppDispatch } from 'hooks'
import { setLoading } from 'store/app'
import { ChallengeData } from 'views/Play/types'

const MyChallenges = () => {
  const dispatch = useAppDispatch()
  const [challenges, setChallenges] = useState<ChallengeData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [page, setPage] = useState(0)

  const fetchData = useCallback(() => {
    dispatch(setLoading(true))
    getMyChallengeList(page * rowsPerPage, rowsPerPage)
      .then((res) => {
        const { count, data } = res
        const temp = [...challenges]
        setChallenges(temp.concat(data))
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
        <img src="/assets/images/handshake-yellow.svg" alt="" className="h-22 mr-10" />
        <p className="text-20 sm:text-24 text-sf-gray-300 leading-30 font-bold">My Challenges</p>
      </div>
      <div className="w-full h-14" />
      {challenges.length > 0 ? (
        <>
          {challenges.map((item) => (
            <MyChallengeCard key={`challenge-card-${item.id}`} {...item} />
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
          <img src="/assets/images/piece-puzzle-yellow.svg" alt="" className="h-74" />
          <div className="w-full h-20" />
          <p className="max-w-378 text-14 text-sf-neutral-300 font-poppins text-center">
            You have no active challenges in play. Click below to view what challenges you can participate in
          </p>
          <div className="w-full h-30" />
          <Link href={`/play/challenge/all`}>
            <button className="bg-danger rounded-[4px] text-12 leading-14 text-white uppercase px-20 py-10">
              View Challenges
            </button>
          </Link>
        </div>
      )}
    </Fragment>
  )
}

export default MyChallenges
