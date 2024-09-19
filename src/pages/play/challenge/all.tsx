import MainPageLayout from 'components/Layouts/MainPage'
import Challenges from 'views/Play/Challenge/All'

const ChallengesPage = () => {
  return <Challenges />
}

ChallengesPage.title = 'Challenges'
ChallengesPage.Layout = MainPageLayout

export default ChallengesPage
