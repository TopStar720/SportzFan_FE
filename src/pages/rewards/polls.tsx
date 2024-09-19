import MainPageLayout from 'components/Layouts/MainPage'
import MyPolls from 'views/Rewards/MyPolls'

const MyPollsPage = () => {
  return <MyPolls />
}

MyPollsPage.title = 'My Polls'
MyPollsPage.Layout = MainPageLayout

export default MyPollsPage
