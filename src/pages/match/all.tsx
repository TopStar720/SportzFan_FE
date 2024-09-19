import MainPageLayout from 'components/Layouts/MainPage'
import Matches from 'views/Match/All'

const MatchesPage = () => {
  return <Matches />
}

MatchesPage.title = 'Upcoming Matches'
MatchesPage.Layout = MainPageLayout

export default MatchesPage
