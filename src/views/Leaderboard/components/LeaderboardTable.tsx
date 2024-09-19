import { classNames } from 'utils'
import { LeaderboardData } from '../types'

const LeaderboardTable = ({ data }: { data: LeaderboardData[] }) => {
  const getTier = (data: LeaderboardData) => {
    const {
      kudos_amount,
      kudos_to_tire1,
      kudos_to_tire2,
      kudos_to_tire3,
      kudos_to_tire4,
      member_level_name1,
      member_level_name2,
      member_level_name3,
      member_level_name4,
    } = data
    if (kudos_amount >= kudos_to_tire1 && kudos_amount < kudos_to_tire2) {
      return { level: 1, name: member_level_name1 }
    } else if (kudos_amount >= kudos_to_tire2 && kudos_amount < kudos_to_tire3) {
      return { level: 2, name: member_level_name2 }
    } else if (kudos_amount >= kudos_to_tire3 && kudos_amount < kudos_to_tire4) {
      return { level: 3, name: member_level_name3 }
    } else if (kudos_amount >= kudos_to_tire4) {
      return { level: 4, name: member_level_name4 }
    }
  }
  return (
    <div className="w-full bg-info border border-sf-zinc-600 rounded-[4px]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-sf-zinc-600 text-12 xl:text-14 leading-10 xl:leading-20 text-sf-zinc-400 font-poppins text-left whitespace-nowrap">
            <th className="px-10 md:px-20 xl:px-40 py-12 text-center">Rank</th>
            <th className="px-10 md:px-20 xl:px-40 py-12">Name</th>
            <th className="hidden md:block px-10 md:px-20 xl:px-40 py-12">Level</th>
            <th className="px-10 md:px-20 xl:px-40 py-12">Kudos Pts</th>
            <th className="px-10 md:px-20 xl:px-40 py-12">Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={`leaderboard-item-${idx.toString()}`}
              className={classNames(
                'text-12 xl:text-14 leading-10 xl:leading-20 text-sf-gray-300 font-poppins',
                idx === 0
                  ? 'bg-warning-light border-l-[3px] border-sf-yellow-500'
                  : idx < data.length - 1
                  ? 'border-b border-sf-zinc-600'
                  : '',
              )}
            >
              <td className="px-10 md:px-20 xl:px-40 py-10 text-center">
                {parseInt(item.rank) < 4 ? (
                  <img src={`/assets/images/rank-${item.rank}.svg`} alt="" className="h-30 m-auto" />
                ) : (
                  item.rank
                )}
              </td>
              <td className="px-10 md:px-20 xl:px-40 py-10">
                <div className="flex items-center">
                  <img
                    src={item.avatar || '/assets/images/default-avatar.png'}
                    alt=""
                    className="w-30 rounded-[5px] mr-8 md:mr-20"
                  />
                  <div>
                    <span>{`${item.first_name} ${item.last_name}`}</span>
                    <div className="md:hidden flex items-center mt-4">
                      <img src={`/assets/images/tier-${getTier(item)?.level}.svg`} alt="" className="w-14 mr-4" />
                      <span>{getTier(item)?.name}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell px-10 md:px-20 xl:px-40 py-10">
                <div className="flex items-center">
                  <img src={`/assets/images/tier-${getTier(item)?.level}.svg`} alt="" className="w-24 mr-8" />
                  <span>{getTier(item)?.name}</span>
                </div>
              </td>
              <td className="px-10 md:px-20 xl:px-40 py-10">
                <div className="flex items-center">
                  <img src="/assets/images/decoration.svg" alt="" className="w-20 mr-6 md:mr-10" />
                  <span>{item.kudos_amount || 0}</span>
                </div>
              </td>
              <td className="px-10 md:px-20 xl:px-40 py-10">
                {!item.old_rank ? (
                  <div className="flex items-center justify-center">
                    <img src="/assets/images/rank_up.svg" alt="" className="w-20 mr-6 md:mr-10" />
                    <span>{Number(item.rank)}</span>
                  </div>
                ) : item.rank === item.old_rank ? (
                  <div className="flex items-center justify-center">
                    <span>-</span>
                  </div>
                ) : Number(item.rank) < Number(item.old_rank) ? (
                  <div className="flex items-center justify-center">
                    <img src="/assets/images/rank_up.svg" alt="" className="w-20 mr-6 md:mr-10" />
                    <span>{Number(item.old_rank) - Number(item.rank)}</span>
                  </div>
                ) : (
                  <div className="flex items-center  justify-center">
                    <img src="/assets/images/rank_down.svg" alt="" className="w-20 mr-6 md:mr-10" />
                    <span>{Number(item.rank) - Number(item.old_rank)}</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardTable
