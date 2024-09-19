import MainPageLayout from 'components/Layouts/MainPage'
import Polls from 'views/Play/Poll/All'

const PollsPage = () => {
  return <Polls />
}

PollsPage.title = 'Polls'
PollsPage.Layout = MainPageLayout

export default PollsPage
