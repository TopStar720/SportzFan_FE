import MainPageLayout from 'components/Layouts/MainPage'
import Leaderboard from 'views/Leaderboard'

const LeaderboardPage = () => {
  return <Leaderboard />
}

LeaderboardPage.title = 'Leaderboard'
LeaderboardPage.Layout = MainPageLayout

export default LeaderboardPage
